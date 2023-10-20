import ReactDOM from 'react-dom';
import React from "react";
import {Notification} from "../index";


const triggerSnackbar = ( message, messageType) => {
    const validMessageTypes = ['error', 'info', 'warning', 'success'];
    if (!validMessageTypes.includes(messageType)) {
        throw Error("Invalid snackbar message type");
    }
    ReactDOM.render(
        <Notification messageType={messageType} timer={2000}  message={message} />,
        document.getElementById('snackbar-fixed-container')
    );
};

export const showErrorMessage = ( message) => {
    triggerSnackbar( message, 'error');
};

export const showInfoMessage = ( message) => {
    triggerSnackbar( message, 'info');
};

export const showSuccessMessage = ( message) => {
    triggerSnackbar( message, 'success');
};

export const showWarningMessage = ( message) => {
    triggerSnackbar( message, 'warning');
};