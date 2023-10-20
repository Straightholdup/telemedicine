import React from "react";
import {EntryTopStyled} from "../Entry/styled";
import {useSelector} from "react-redux";

export const EntryInfo = () => {

    const selectedDoctor = useSelector(state => state.categories.selectedDoctor);

    return(
        <>
            <EntryTopStyled>
                <h4>Запись на прием к врачу</h4>
                <h4>
                    {selectedDoctor.full_name}
                    <br/>
                    ({selectedDoctor.grade})
                </h4>
            </EntryTopStyled>
            <EntryTopStyled>
                <h4>Стоимость консультации</h4>
                <h4>{selectedDoctor.price} тг.</h4>
            </EntryTopStyled>
            <EntryTopStyled>
                <h4>Длительность консультации</h4>
                <h4>{selectedDoctor.duration}</h4>
            </EntryTopStyled>
        </>
    )
}