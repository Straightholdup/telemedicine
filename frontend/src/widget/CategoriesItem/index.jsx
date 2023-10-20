import React from "react";
import {CategoriesItemButton, CategoriesItemsWrapper} from "./styled";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setDisease,  setSelectionType} from "../../features/CategoriesSlice";
import {Medicine} from "../../app/styles/icons/medicine";
import {API_URL} from "../../variables";
import {setAllDoctor} from "../../features/AllDoctorSlice";
import {showErrorMessage} from "../Notification/TriggerNotification";

export const CategoriesItem = ({dataType}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const onClickSelectSymptom= (data) => () => {
        fetch(`${API_URL}/doctor/?symptom_id=${data.id}`)
            .then(response => {
                if (response.status !== 200) {
                    throw new Error("Докторы по сиптомам не получены!")
                }
                return response.json();
            })
            .then(data => {
                dispatch(setAllDoctor(data));
            })
            .catch(err => {
                showErrorMessage(err.toString().replace("Error:",""));
            })
        dispatch(setDisease(data));
        dispatch(setSelectionType("disease"));
        navigate(`/disease/${data.id}`);


    };

    return (
        <CategoriesItemsWrapper>
            {
                dataType?.map((item, index) => (
                    <CategoriesItemButton
                        key={index}
                        onClick={onClickSelectSymptom(item)}
                    >
                        <Medicine/>
                        {item.name}
                    </CategoriesItemButton>
                ))
            }
        </CategoriesItemsWrapper>
    )
}