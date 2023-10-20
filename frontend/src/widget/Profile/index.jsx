import React, {useEffect, useState} from "react";
import {Avatar} from "../../app/styles/icons/avatar";
import {
    ProfileBlockFirst,
    ProfileBlocks,
    ProfileBlockSecond,
    ProfileContainer,
    ProfileMail, ProfileName,
    ProfileTitle, TabsProfile
} from "./styled";
import {Tab} from "../Tabs/styled";
import {EntriesList} from "../EntriesList";
import {useSelector} from "react-redux";
import {API_URL} from "../../variables";
import {showErrorMessage} from "../Notification/TriggerNotification";

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

export const Profile = () => {
    const [currentTab, setCurrentTab] = useState(items[0].index);
    const profile = useSelector(state => state.profile.profileData);
    const [orders, setOrders] = useState([]);
    const [type, setType] = useState("");

    const [showLoader, setShowLoader] = useState(false);

    const getOrders = (type) => {
        setShowLoader(true)
        fetch(`${API_URL}/request/list/?time=${type}`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization":`Token ${localStorage.getItem("token")}`
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
                if (type === "future"){
                    setType("future")
                }
                else{
                    setType("past")
                }
                setShowLoader(false);
            })
            .catch(err => {
                showErrorMessage(err.toString().replace("Error:",""));
            })
    }

    useEffect(() => {
       getOrders("future");
    },[])

    const handleClick = (index, type) => () => {
        setCurrentTab ? setCurrentTab(index) : void 0;
        getOrders(type);
    };

    return (
        <ProfileContainer>
            <ProfileTitle>Личный Кабинет</ProfileTitle>
            <ProfileBlocks>
                <ProfileBlockFirst>
                    <Avatar/>
                    <ProfileMail>{profile.email}</ProfileMail>
                    <ProfileName>{profile.full_name}</ProfileName>
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
                    <EntriesList orders={orders} showLoader={showLoader} type={type}/>
                </ProfileBlockSecond>
            </ProfileBlocks>
        </ProfileContainer>
    )
};
