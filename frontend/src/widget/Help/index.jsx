import React from "react";
import {HelpContainer, HelpContainerItem, HelpContainerItems, HelpTitle, Number, Text} from "./styled";

const mockDataHelp = [
    {
        id: 1,
        text: "Выберите врача или то, что Вас беспокоит",
    },
    {
        id: 2,
        text: "Выберите удобную дату и время консультации",
    },
    {
        id: 3,
        text: "Укажите свои данные и оплатите услугу",
    },
    {
        id: 4,
        text: "После оплаты Вы получите ссылку на видео консультацию",
    },
    {
        id: 5,
        text: "В выбранное время перейдите по ссылке и проконсультируйтесь с врачом",
    },
    {
        id: 6,
        text: "После консультации врач отправит Вам заключение и подробные рекомендации",
    },

]


export const Help = () => {
    return (
        <HelpContainer>
            <HelpTitle>Как проконсультироваться?</HelpTitle>
            <HelpContainerItems>
                {
                    mockDataHelp.map((item, index) => (
                        <HelpContainerItem key={index}>
                            <Number>{item.id}</Number>
                            <Text>{item.text}</Text>
                        </HelpContainerItem>
                    ) )
                }
            </HelpContainerItems>
        </HelpContainer>
    )
}