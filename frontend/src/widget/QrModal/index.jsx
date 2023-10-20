import React from "react";
import "./style.css";
import {CloseIcon} from "../../app/styles/icons/close";
import {ButtonStyled} from "../EntryTwo/styled";
import {Loader} from "../Loader";

export const QrModal = (props) => {
    const {setShowModal, qr, qrLoader} = props;
    return (
        <>
            <div className="overlay_modal-qr"/>
            <div className="modal-qr">
                <div className="modal-inner-qr">
                    <h4 className="modal-title-qr">В данный момент оплата через KASPI QR не доступна</h4>
                    <div className="modal-calendar-wrapper-qr">
                        {
                            qrLoader
                                ? <img src={qr} alt="icons"/>
                                : <Loader/>
                        }

                        <div className="send-button-qr">
                            <ButtonStyled onClick={() => setShowModal(false)}>
                                Понятно
                            </ButtonStyled>
                        </div>
                    </div>
                    <button
                        className="modal-button-close-qr"
                        onClick={() => setShowModal(false)}
                    >
                        <CloseIcon width="32px" height="32px" color="#D2DADF"/>
                    </button>
                </div>
            </div>
        </>
    )
}