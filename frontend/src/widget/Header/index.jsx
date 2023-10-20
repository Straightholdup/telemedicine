import React from "react";
import {
    ButtonStyled,
    HeaderActions,
    HeaderContainer,
    HeaderInner, HeaderLink,
    HeaderMainPage, ThemeSwitch,
    TitleStyled
} from "./styled";
import {useNavigate} from "react-router-dom";
import {Avatar} from "../../app/styles/icons/avatar";
import {useDispatch, useSelector} from "react-redux";
import {setLoginType, setThemeMode} from "../../features/CategoriesSlice";
import {ThemeContext,themes} from "../../app/theme/ThemeContext";

export const Header = ({setToken}) => {
    const darkMode = useSelector(state => state.categories.themeMode);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logOut = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
        dispatch(setLoginType(JSON.parse("false")));
    }

    const goToPage = (route) => () => {
        navigate(route);
    }

    return (
        <HeaderContainer>
            <HeaderInner>
                <TitleStyled>
                    Телемедицина
                </TitleStyled>
                <HeaderActions>
                    <ThemeContext.Consumer>
                        {({ changeTheme }) => (
                            <ThemeSwitch>
                                <input type="checkbox"
                                       className="checkbox"
                                       id="checkbox"
                                       onChange={() => {
                                           dispatch(setThemeMode(!darkMode));
                                           changeTheme(darkMode ? themes.light : themes.dark);
                                       }}
                                />
                                <label htmlFor="checkbox" className="label">
                                    <i className="fas fa-moon"></i>
                                    <i className='fas fa-sun'></i>
                                    <div className='ball'/>
                                </label>
                            </ThemeSwitch>
                        )}
                    </ThemeContext.Consumer>
                    <HeaderMainPage>
                        <HeaderLink  onClick={goToPage("/")}>
                            Онлайн-Консультация
                        </HeaderLink>
                    </HeaderMainPage>
                    <div style={{cursor: "pointer"}}
                         onClick={goToPage("/profile")}>
                        <Avatar/>
                    </div>
                    <ButtonStyled onClick={logOut}>
                        выйти
                    </ButtonStyled>
                </HeaderActions>
            </HeaderInner>
        </HeaderContainer>
    )
}