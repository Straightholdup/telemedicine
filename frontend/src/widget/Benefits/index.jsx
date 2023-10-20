import React from "react";
import {
    BenefitsContainer,
    BenefitsContainerItem,
    BenefitsContainerItems,
    BenefitsTitle,
    Image,
    Text
} from "./styled";
import benefit1 from "../../app/styles/images/benefit1.png";
import benefit2 from "../../app/styles/images/benefit2.png";
import benefit3 from "../../app/styles/images/benefit3.png";
import benefit4 from "../../app/styles/images/benefit4.png";


const mockDataBenefits = [
    {
        id: 1,
        src: benefit1,
        text: "В нашем сервисе только квалифицированные врачи",
    },
    {
        id: 2,
        src: benefit2,
        text: "Общайтесь с врачами в любое время из любой точки мира",
    },
    {
        id: 3,
        src: benefit3,
        text: "Стоимость онлайн консультации в 3-6 раз дешевле очного приема",
    },
    {
        id: 4,
        src: benefit4,
        text: "Для консультации с врачом,вам нужен только смартфон",
    },
]

export const Benefits = () => {

    return(
        <BenefitsContainer>
            <BenefitsTitle>Преимущества</BenefitsTitle>
            <BenefitsContainerItems>
                {
                    mockDataBenefits.map((item, index) => (
                        <BenefitsContainerItem key={index}>
                            <Image alt="img" src={item.src}/>
                            <Text>{item.text}</Text>
                        </BenefitsContainerItem>
                    ) )
                }
            </BenefitsContainerItems>
        </BenefitsContainer>
    )
};