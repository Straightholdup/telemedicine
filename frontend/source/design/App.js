import React, {useEffect, useState} from "react";
import './App.css';
import {Header} from "./components/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "./components/Login";
import {MainPage} from "./pages/main-page";
import {SelectDoctorPage} from "./pages/select-doctor-page";
import {useSelector} from "react-redux";
import {EntryPage} from "./pages/entry-page";
import {EntryTwoPage} from "./pages/entry-two-page";
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import 'react-notifications/lib/notifications.css';
import {EntryThreePage} from "./pages/entry-three-page";
import {SuccessPage} from "./pages/success-page";
import {ProfilePage} from "./pages/profile-page";
import {Footer} from "./components/Footer";
import {ThemeContext, themes} from "./context/ThemeContext";


const App = () => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const disease = useSelector(state => state.categories.disease);
    const doctorType = useSelector(state => state.categories.doctorType);
    const [theme, setTheme] = useState(themes.dark);

    const changeTheme = (theme) => {
        setTheme(theme);
    }

    useEffect(() => {
        switch (theme) {
            case themes.light:
                document.body.classList.add('white-content');

                break;
            case themes.dark:
            default:
                document.body.classList.remove('white-content');
                break;
        }
    }, [theme]);

    if (!token) {
        return <Login setToken={setToken}/>
    }

    return (
        <BrowserRouter>
            <ThemeContext.Provider value={{theme, changeTheme}}>
                <Header setToken={setToken}/>
                <Routes>
                    <Route exact path="/" element={<MainPage/>}/>
                    <Route path={"/disease" + "/" + disease.id} element={<SelectDoctorPage/>}/>
                    <Route path={"/" + doctorType.id} element={<SelectDoctorPage/>}/>
                    <Route path="/entry" element={<EntryPage/>}/>
                    <Route path="/entry-two" element={<EntryTwoPage/>}/>
                    <Route path="/entry-three" element={<EntryThreePage/>}/>
                    <Route path="/success" element={<SuccessPage/>}/>
                    <Route path="/profile" element={<ProfilePage/>}/>
                </Routes>
                <Footer/>
                <NotificationContainer/>
            </ThemeContext.Provider>
        </BrowserRouter>
    );
}
export default App;
