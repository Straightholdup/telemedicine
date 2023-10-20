import React, {useState} from "react";
import {useSelector} from "react-redux";
import {
    ButtonStyled,
    CountOfDoctors,
    DiseaseNameStyled,
    FiltersContainer,
    InfoTopStyled,
    ListOfDoctor,
    ListOfDoctorByDiseaseContainer,
    ListOfDoctorTop,
    StatusStyled
} from "./styled";
import {FilterIcon} from "../../app/styles/icons/filter";
import {SortIcon} from "../../app/styles/icons/sort";
import {DoctorItem} from "../DoctorItem";


export const ListOfDoctorByDisease = () => {
    const disease = useSelector(state => state.categories.disease);
    const doctorType = useSelector(state => state.categories.doctorType);
    const typeOfSelect = useSelector(state => state.categories.typeOfSelection);
    const darkMode = useSelector(state => state.categories.themeMode);
    const allDoctorBySpecialization = useSelector(state => state.allDoctor.allDoctor);

    const title = typeOfSelect === "disease" ? disease.name : doctorType.type;


    const [flagExp, setFlagExp] = useState(false);
    const [flagPrice, setFlagPrice] = useState(false);


    const sortItems = (type) => () => {
        if (type === "exp") {
            if (flagExp === true)
                allDoctorBySpecialization.sort((a, b) => a.experience - b.experience);
            else
                allDoctorBySpecialization.sort((a, b) => b.experience - a.experience);
            setFlagExp(!flagExp);
        } else if (type === "price") {
            if (flagPrice === true)
                allDoctorBySpecialization.sort((a, b) => a.price - b.price);
            else
                allDoctorBySpecialization.sort((a, b) => b.price - a.price);
            setFlagPrice(!flagPrice);
        }

    };

    const setColor = (type) => {
        return type ? "#000000" : "#FFFFFF"
    }

    return (
        <ListOfDoctorByDiseaseContainer>
            <InfoTopStyled>
                <DiseaseNameStyled>{title}</DiseaseNameStyled>
                <StatusStyled>online</StatusStyled>
            </InfoTopStyled>
            <ListOfDoctor>
                <ListOfDoctorTop>
                    <CountOfDoctors> {allDoctorBySpecialization?.length} врач - принимает онлайн</CountOfDoctors>
                    <FiltersContainer>
                        <ButtonStyled style={{color: setColor(darkMode)}}
                                      onClick={sortItems("exp")}>
                            <FilterIcon flagExp={flagExp}/>
                            По стажу
                        </ButtonStyled>
                        <ButtonStyled style={{color: setColor(darkMode)}}
                                      onClick={sortItems("price")}>
                            <SortIcon flagPrice={flagPrice}/>
                            По цене
                        </ButtonStyled>
                    </FiltersContainer>
                </ListOfDoctorTop>
            </ListOfDoctor>
            <div>
                <DoctorItem/>
            </div>
        </ListOfDoctorByDiseaseContainer>
    )
};