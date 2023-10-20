import React from "react";
import {History} from "../../app/styles/icons/history";
import {Document} from "../../app/styles/icons/document";
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