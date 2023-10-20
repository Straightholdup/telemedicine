import React from "react";
import {ForWhoContainer, ForWhoInner, ForWhoTitle, Text} from "./styled";
import forWho from '../../app/styles/images/benefit4.png';

const mockDataForWho = [
    {
        id: 1,
        text: " У Вас нет времени посетить клинику, но Вам нужно получить мнение профессионала",
    },
    {
        id: 2,
        text: "Вам нужна срочная консультация и как можно скорее",
    },
    {
        id: 3,
        text: "Вы хотите получить дополнительное мнение по уже поставленному диагнозу или лечению",
    },
    {
        id: 4,
        text: "Вы не знаете, к какому врачу обратиться и хотите получить первичную консультацию и направление терапевта или педиатра",
    }
]


export const ForWho = () => {
    return (
        <ForWhoContainer>
            <ForWhoTitle>Для кого подойдет консультация</ForWhoTitle>
            <ForWhoInner>
                <div>
                    <img
                        src={forWho}
                        alt="img"
                    />
                </div>
                <div>
                    {
                        mockDataForWho.map((item, index) => (
                            <Text key={index}>
                                <strong>{item.id}.</strong> {item.text}
                            </Text>
                        ))
                    }
                </div>
            </ForWhoInner>
        </ForWhoContainer>
    )
}