import React from "react";
import doctorImage from "../../assets/images/forWho.png";
import {DoctorTypeItemWrapper} from "./styled";
import {setDoctorType, setSelectionType} from "../../features/CategoriesSlice";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {API_URL} from "../../variables";
import {setAllDoctor} from "../../features/AllDoctorSlice";
import {showErrorMessage} from "../Notification/TriggerNotification";

export const DoctorTypesItem = (props) => {

    const {doctorItem, index,} = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const onClickSelectDoctor= (data) => () => {
        fetch(`${API_URL}/doctor/?specialization_id=${data.id}`)
            .then(response => {
                if (response.status !== 200) {
                    throw new Error("Докторы не получены!")
                }
                return response.json();
            })
            .then(data => {
                dispatch(setAllDoctor(data));
            })
            .catch(err => {
                showErrorMessage(err.toString().replace("Error:",""));
            })
        dispatch(setDoctorType(data));
        dispatch(setSelectionType("doctorType"));
        navigate(`/${data.id}`);
    };

    return (
        <DoctorTypeItemWrapper
            key={index + doctorItem.id}
            onClick = {onClickSelectDoctor(doctorItem)}
        >
                <img src={doctorImage} alt='1'/>
            <div>
                <h2>{doctorItem.type}</h2>
                <h6>
                    это врач, занимающийся диагностикой и лечением заболеваний
                    женской половой сферы у девочек.
                </h6>
            </div>
        </DoctorTypeItemWrapper>
    )
}