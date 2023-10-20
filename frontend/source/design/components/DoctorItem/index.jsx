import React from "react";
import {DoctorAvatar, DoctorItemWrapper, ButtonStyled, H4Styled} from "./styled";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setSelectedDoctor} from "../../../feature/CategoriesSlice";
import {imgSrcHelper} from "../../variables";


export const DoctorItem = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const allDoctorBySpecialization = useSelector(state => state.allDoctor.allDoctor);

    const handleOnClickEntry = (item) => () => {
        dispatch(setSelectedDoctor(item));
        navigate("/entry");
    };

    return (
        <div>
            {
                allDoctorBySpecialization?.map((item, index) => (
                    <DoctorItemWrapper>
                        <DoctorAvatar
                            alt="avatar"
                            src={item.imgSrc || imgSrcHelper}
                        />
                        <div>
                            <H4Styled style={{fontWeight:700}}>{item.full_name}</H4Styled>
                            <H4Styled style={{fontSize: 18}}>{item.grade}</H4Styled>
                            <H4Styled style={{color: "#21A038"}}>Стаж: {item.experience} лет/года</H4Styled>
                            <H4Styled>О враче: Врач общей практики. Опыт работы более 5 лет. Веду прием
                                пациентов с рождения и до пожилого возраста. Консультирую
                                онлайн не выходя из дома.</H4Styled>
                            <H4Styled>
                                Цена: <strong>{item.price} тг.</strong>
                            </H4Styled>
                            <H4Styled
                                style={{
                                    borderBottom: "1px solid black",
                                    paddingBottom: 15
                                }}>
                                Длительность консультации - {item.duration}
                            </H4Styled>
                            <ButtonStyled
                                onClick={handleOnClickEntry(item)}
                            >
                                Записаться
                            </ButtonStyled>
                        </div>
                    </DoctorItemWrapper>
                ))
            }
        </div>
    )
};