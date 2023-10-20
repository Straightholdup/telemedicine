import React, {useEffect, useState} from 'react';
import {Tabs} from "../Tabs";
import {CategoriesItem} from "../CategoriesItem";
import {CategoriesTitle, CategoriesWrapper} from "./styled";
import {API_URL} from "../../variables";
import {showErrorMessage} from "../Notification/TriggerNotification";

const items = [
    {
        label: 'Взрослым',
        index: 'Взрослым',
        filter: "adult"
    },
    {
        label: 'Детям',
        index: 'Детям',
        filter: "child"
    },
    {
        label: 'Мужчинам',
        index: 'Мужчинам',
        filter: "men"
    },
    {
        label: 'Женщинам',
        index: 'Женщинам',
        filter: "women"
    },
];

export const Categories = () => {
    const [currentTab, setCurrentTab] = useState(items[0].index);
    const [symptoms, setSymptoms] = useState([]);

    const getSymptoms = (filter) => {
        fetch(`${API_URL}/symptoms/?filter=${filter}`)
            .then(response => {
                if (response.status !== 200) {
                    throw new Error("Специализации не получены!")
                }
                return response.json();
            })
            .then(data => {
                setSymptoms(data);
            })
            .catch(err => {
                showErrorMessage(err.toString().replace("Error:",""));
            })
    }

    useEffect(() => {
        getSymptoms("adult");
    },[])


    return (
        <CategoriesWrapper>
            <CategoriesTitle>Вы можете выбрать болезнь или симптом, который вас беспокоит</CategoriesTitle>
            <Tabs
                items={items}
                onChange={setCurrentTab}
                currentTab={currentTab}
                getSymptoms={getSymptoms}
            />
            <CategoriesItem dataType={symptoms}/>
        </CategoriesWrapper>
    )
}