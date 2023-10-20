import React, {useEffect, useState} from "react";
import {EntryContainer} from "../Entry/styled";
import {ButtonDisabledStyled, ButtonStyled, Steps} from "../EntryTwo/styled";
import {useNavigate} from "react-router-dom";
import {Payment, PaymentItem, PaymentItemTitle, PaymentTitle, PaymentTypes, SelectedPayment} from "./styled";
import {Qr} from "../../app/styles/icons/qr";
import {Card} from "../../app/styles/icons/card";
import {EntryInfo} from "../EntryInfo";
import {API_QR_URL, API_URL, isEmpty} from "../../variables";
import {QrModal} from "../QrModal";
import {showInfoMessage} from "../Notification/TriggerNotification";
import {useSelector} from "react-redux";

export const EntryThree = () => {
    const [status, setStatus] = useState("");
    const [flagBlock, setFlagBlock] = useState(false);
    const [qrLoader, setQrLoader] = useState(false);
    const [showModal, setShowModal] = useState(false);


    const [redirectUrl, setRedirectUrl] = useState("");
    const [qr, setQr] = useState("");
    const [error, setError] = useState("");
    const [selectedPaymentType, setSelectedPaymentType] = useState("");
    const [orderId, setOrderId] = useState(null);


    const navigate = useNavigate();

    const request_id = useSelector(state => state.request.requestId);
    const selectedDoctor = useSelector(state => state.categories.selectedDoctor);


    const type = selectedPaymentType === "qr" ? " с помощью QR" : "картой";
    const text = flagBlock && `Консультация будет оплачена ${type}`;


    const selectPaymentType = (paymentType) => () => {
        if (paymentType === "card") {
            paymentCard();
        } else {
            getQrPayment();
            setShowModal(!showModal);
        }
        setSelectedPaymentType(paymentType);
    };

    useEffect(() => {
        if (qr) {
            setShowModal(true);
        }
    }, [qr])

    const paymentCard = () => {
        const body = {
            "amount": selectedDoctor.price,
            "request_id": request_id
        }
        fetch(`${API_URL}/payments/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(body)
        })
            .then(response => {
                if (response.status !== 200) {
                    throw new Error("Редирект на оплату не произошел, попробуйте позже!");
                }
                return response.json();
            })
            .then(data => {
                setRedirectUrl(data.redirect_url);
                setOrderId(data.order_id);
            })
            .catch(err => {
                setError(err.toString().replace("Error:", ""));
            })
    }

    const checkPaymentStatus = () => {
        const body = {
            "order_id": orderId,
        }
        fetch(`${API_URL}/payments/long-pool/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(body)
        })
            .then(response => {
                if (response.status !== 200) {
                    throw new Error("Оплата не прошла");
                }
                return response.json();
            })
            .then(data => {
                setStatus(data.status);
            })
            .catch(err => {
                setError(err.toString().replace("Error:", ""));
            })
    }

    const getQrPayment = () => {
        setQrLoader(false);
        fetch(API_QR_URL)
            .then(response => {
                if (response.status !== 200) {
                    throw new Error("QR не получен!");
                }
                return response.blob();
            })
            .then(data => {
                const imageObjectURL = URL.createObjectURL(data);
                setQr(imageObjectURL);
                setQrLoader(true);
            })
            .catch(err => {
                setError(err.toString().replace("Error:", ""));
            })
    }

    const goToNextStep = () => {
        navigate("/success");
    };

    useEffect(() => {
        if (selectedPaymentType !== "") {
            setFlagBlock(true);
        } else {
            setFlagBlock(false);
        }
    }, [selectedPaymentType]);


    useEffect(() => {
        if (!isEmpty(redirectUrl)) {
            window.open(redirectUrl, "_blank");
        }
    }, [redirectUrl])

    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [showModal]);

    useEffect(() => {
        if (orderId) {
            checkPaymentStatus();
        }
    }, [orderId]);

    return (
        <EntryContainer>
            <EntryInfo/>
            <Payment>
                <PaymentTitle>Произведите Оплату Консультации</PaymentTitle>
                <PaymentTypes>
                    <PaymentItem
                        onClick={selectPaymentType("qr")}
                    >
                        <PaymentItemTitle>Оплата по QR</PaymentItemTitle>
                        <Qr/>
                    </PaymentItem>
                    <PaymentItem
                        onClick={selectPaymentType("card")}
                    >
                        <PaymentItemTitle>Оплата картой</PaymentItemTitle>
                        <Card/>
                    </PaymentItem>
                </PaymentTypes>
            </Payment>
            <SelectedPayment>{error ? error : text}</SelectedPayment>
            <Steps>Шаг 3 из 3</Steps>
            {
                status === "PAYED"
                    ? < ButtonStyled onClick={goToNextStep}>Завершить</ButtonStyled>
                    : <ButtonDisabledStyled
                        onClick={() => showInfoMessage("Произведите оплату")}>
                        Завершить
                    </ButtonDisabledStyled>
            }
            {
                showModal && <QrModal setShowModal={setShowModal} qr={qr} qrLoader={qrLoader}/>
            }
        </EntryContainer>
    )
};
