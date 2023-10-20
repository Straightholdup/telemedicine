import React, {useEffect, useState} from "react";
import ReactDOM from 'react-dom';
import './style.css';
import {animated} from "@react-spring/web";
import {CloseIcon} from "../../app/styles/icons/close";

export const Notification = (props) => {
    const [closeTimeout, setCloseTimeout] = useState(null);


    const closeSnackBar = () => {
        clearTimeout(closeTimeout);
        ReactDOM.unmountComponentAtNode(document.getElementById('snackbar-fixed-container'));
    };

    const beginCloseTimeout = () => {
        if (props.timer) {
            const timeout = setTimeout(() => closeSnackBar(), props.timer);
            setCloseTimeout(timeout);
        }
    };

    useEffect(() => {
        beginCloseTimeout();
    }, []);


    return (
        <animated.div className={`snackbar-container ${props.messageType}-container`}
                      onMouseEnter={() => clearTimeout(closeTimeout)}
                      onMouseLeave={() => beginCloseTimeout()}>
            <div className="notification__container--open">
                <button id="close-snackbar-icon" className="notification__topBar--btn" onClick={() => closeSnackBar()}>
                    <CloseIcon width="10px" height="10px" color="#111111"/>
                </button>
                <div className="notification__top">
                    <div className="notification_sub_container_content_top_card">
                        <img className={`snackbar-icon ${props.messageType}-snackbar-icon`}/>
                    </div>
                </div>

                <div className="notification__bottom">
                    <animated.div className="notification__bottom--name">
                        {props.message}
                    </animated.div>
                </div>
            </div>
        </animated.div>
    );
}