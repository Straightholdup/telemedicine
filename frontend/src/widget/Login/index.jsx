import React, {useState} from "react";
import {LoginContainer, SwitchTheme, TitleStyled} from "./styled";
import {TabsProfile} from "../Profile/styled";
import {Tab} from "../Tabs/styled";
import {Authorization} from "./Authorization";
import {Registration} from "./Registration";
import logo from '../../app/styles/images/logo.png';
import {ThemeContext, themes} from "../../app/theme/ThemeContext";
import {ThemeSwitch} from "../Header/styled";
import {setThemeMode} from "../../features/CategoriesSlice";
import {useDispatch, useSelector} from "react-redux";

const items = [
    {
        label: 'Авторизация',
        index: 'Авторизация',
    },
    {
        label: 'Регистрация',
        index: 'Регистрация',
    },
];

export const Login = ({setToken}) => {
    const [currentTab, setCurrentTab] = useState(items[0].index);
    const darkMode = useSelector(state => state.categories.themeMode);

    const dispatch = useDispatch();


    const handleClick = (index) => () => {
        setCurrentTab ? setCurrentTab(index) : void 0;
    };

    return (
        <LoginContainer>
            <SwitchTheme>
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
            </SwitchTheme>
           <img style={{width:"500px", borderRadius:"100px"}} src={logo} alt="1"/>
            <TabsProfile>
                {
                    items.map((item) => (
                        <Tab
                            key={item.index}
                            onClick={handleClick(item.index)}
                            active={currentTab === item.index}
                        >
                            {item.label}
                        </Tab>
                    ))
                }
            </TabsProfile>
            {
                currentTab === 'Авторизация'
                    ? <Authorization setToken={setToken}/>
                    : currentTab === 'Регистрация'
                        ? <Registration
                            setCurrentTab={setCurrentTab}
                        />
                        : null
            }
        </LoginContainer>
    )
};