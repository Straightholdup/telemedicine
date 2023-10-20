import React from "react";
import {TailSpin} from "react-loader-spinner";

export const Loader = () => {
    return(
        <div style={{
            display:"flex",
            alignItems:"center",
            justifyContent:"center"
        }}>
            <TailSpin
                height="100"
                width="100"
                color="#006edc"
                ariaLabel='loading'
            />
        </div>
    )
}