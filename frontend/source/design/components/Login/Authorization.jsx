import React, {useState} from 'react';
import {ButtonStyled, FormStyled, H1Styled, InputStyled} from "./styled";
import {useDispatch} from "react-redux";
import {setLoginType} from "../../../feature/CategoriesSlice";
import {API_URL} from "../../variables";
import {setProfileData} from "../../../feature/ProfileSlice";
import {showErrorMessage, showSuccessMessage} from "../Notification/TriggerNotification";

export const Authorization = ({setToken}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();



    const handleSubmit = (e) => {
        e.preventDefault();
        const body = {
            "email": username,
            "password": password
        }
        fetch(`${API_URL}/auth/users/login/`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body : JSON.stringify(body)
        })
            .then(response => {
                if (response.status !== 200) {
                    throw new Error("Неправильный логин или пароль!");
                }
                return response.json();
            })
            .then(data => {
                setToken(data.token);
                dispatch(setProfileData(data.user));
                localStorage.setItem("token", data.token);
                showSuccessMessage("Успешная авторизация!")

                dispatch(setLoginType(data.user.is_doctor))
                sessionStorage.setItem("type", data.user.is_doctor);
            })
            .catch(err => {
                setError(err.toString().replace("Error:",""));
                showErrorMessage(err.toString().replace("Error:",""));
            })
    };

    return (
        <FormStyled>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label htmlFor="firstInput">
                        <H1Styled>Почта</H1Styled>
                    </label>
                    <InputStyled
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        type="email"
                        id="firstInput"
                    />
                </div>
                <div>
                    <label htmlFor="secondInput">
                        <H1Styled>Пароль</H1Styled>
                    </label>
                    <InputStyled
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        type="password"
                        id="secondInput"
                    />
                </div>

                    <ButtonStyled type="submit">Войти</ButtonStyled>
            </form>
            <div style={{color:"#B30047"}}>{error}</div>
        </FormStyled>
    )
}
