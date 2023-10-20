import React, {useEffect} from "react";
import {SuccessEntry} from "../../components/SuccessEntry";

export const SuccessPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Успешно";
    }, []);

    return (
        <>
            <SuccessEntry/>
        </>
    )
}