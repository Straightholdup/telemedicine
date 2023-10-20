import React from "react";
import {GreetingContainer, GreetingText} from "./styled";
import greetingImg from "../../assets/images/greeting.png";

export const Greetings = () => {
    return (
        <GreetingContainer>
            <GreetingText>Онлайн-консультация <br/>
                с практикующим врачом<br/>
                не выходя из дома.
            </GreetingText>
            <div>
                <img src={greetingImg} alt="greeting"/>
            </div>
        </GreetingContainer>

    )
}