import React from "react";
import {History} from "../../assets/icons/history";
import {Document} from "../../assets/icons/document";
import {NoContent} from "../EntriesList/styled";

export const SizeEntryZero = ({type}) => {
    return (
        <NoContent>
            {
                type === "past"
                    ? <>  <History/>
                        <p>История Пуста</p>
                    </>
                    : <>
                        <Document/>
                        <p>Нет текущих записей</p>
                    </>
            }
        </NoContent>
    )
}