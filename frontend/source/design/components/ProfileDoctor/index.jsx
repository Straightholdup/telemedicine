import React, {useEffect, useState} from "react";
import {Avatar} from "../../assets/icons/avatar";
import {
    ProfileBlockFirst,
    ProfileBlocks,
    ProfileBlockSecond,
    ProfileContainer,
    ProfileMail, ProfileName,
    ProfileTitle, TabsProfile
} from "../Profile/styled";
import {Tab} from "../Tabs/styled";
import {EntriesList} from "../EntriesList";
import {CalendarModal} from "../CalendarModal";
import {ButtonStyled} from "../EntryTwo/styled";
import {useSelector} from "react-redux";
import {API_URL} from "../../variables";
import {showErrorMessage, showSuccessMessage} from "../Notification/TriggerNotification";
import {InputStyled} from "../Login/styled";

const items = [
    {
        label: 'Ваши Записи',
        index: 'Ваши Записи',
        type: "future",
    },
    {
        label: 'История',
        index: 'История',
        type:"past",
    },
];

export const ProfileDoctor = () => {
    const [showModal, setShowModal] = useState(false);
    const [currentTab, setCurrentTab] = useState(items[0].index);

    const profile = useSelector(state => state.profile.profileData);
    const [orders, setOrders] = useState([]);
    const [type, setType] = useState("");
    const [price, setPrice] = useState("");
    ;
    const [showLoader, setShowLoader] = useState(false);

    const getOrders = (type) => {
        setShowLoader(true)
        fetch(`${API_URL}/request/list/?time=${type}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        })
            .then(response => {
                if (response.status !== 200) {
                    throw new Error("Список записей не получен!");
                }
                return response.json();
            })
            .then(data => {
                setOrders(data.request_list);
                if (type === "future") {
                    setType("future")
                } else {
                    setType("past")
                }
                setShowLoader(false);
            })
            .catch(err => {
                showErrorMessage(err.toString().replace("Error:", ""));
            })
    }

    useEffect(() => {
        getOrders("future");
    }, [])

    const handleClick = (index, type) => () => {
        setCurrentTab ? setCurrentTab(index) : void 0;
        getOrders(type);
    };

    const setDoctorPrice = () => {
        const body = {
            "price": Number(price)
        }
        fetch(`${API_URL}/set-price/`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(body)
        })
            .then(response => {
                if (response.status !== 200) {
                    throw new Error("Цена не указана!!");
                }
                return response.json();
            })
            .then(() => {
                showSuccessMessage("Цена успешна изменена!")
                setPrice("");
            })
            .catch(err => {
                showErrorMessage(err.toString().replace("Error:", ""));
            })
    }


    return (
        <ProfileContainer>
            <ProfileTitle>Личный Кабинет Доктора</ProfileTitle>
            <ProfileBlocks>
                <ProfileBlockFirst>
                    <Avatar/>
                    <ProfileMail>{profile.email}</ProfileMail>
                    <ProfileName>{profile.full_name}</ProfileName>
                    <ProfileName>{profile.specialization}</ProfileName>
                    <ButtonStyled onClick={() => setShowModal(!showModal)}>
                        выбрать время
                    </ButtonStyled>
                    <div style={{marginTop:"20px"}}>
                        <InputStyled
                            style={{width:"100%"}}
                            value={price}
                            placeholder="Cумма консультации"
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <ButtonStyled
                            onClick={setDoctorPrice}
                        >
                            установить цену
                        </ButtonStyled>
                    </div>
                    {
                        showModal && <CalendarModal
                            showModal={setShowModal}
                            setShowModal={setShowModal}
                        />
                    }
                </ProfileBlockFirst>
                <ProfileBlockSecond>
                    <TabsProfile>
                        {
                            items.map((item) => (
                                <Tab
                                    key={item.index}
                                    onClick={handleClick(item.index, item.type)}
                                    active={currentTab === item.index}
                                >
                                    {item.label}
                                </Tab>
                            ))
                        }
                    </TabsProfile>
                    <EntriesList orders={orders} type={type} showLoader={showLoader}/>
                </ProfileBlockSecond>
            </ProfileBlocks>
        </ProfileContainer>
    )
};
