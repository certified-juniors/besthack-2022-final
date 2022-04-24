import React from 'react';
import MyNavbar from "./Components/MyNavbar";
import News from './Components/News';
import Currency from "./Components/Currency";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Balance from "./Components/Balance"
import Administration from "./Components/Administration"
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import axios from "axios";
import { useState, useEffect } from "react";
import Profile from "./Components/Profile";

const myaxios = axios.create({
    baseURL: 'http://127.0.0.1:2001',
    method: "POST",
});

const App = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "//code.jivo.ru/widget/psBWo2fHkp";
        script.async = true;
        document.body.appendChild(script);
    }, [])
    return (
        /*<Administration/>*/
        <BrowserRouter>
            <MyNavbar />
            <Switch>
                <Route exact path="/">
                    <News />
                </Route>
                <Route path="/currency">
                    <Currency />
                </Route>
                <Route path="/profile">
                    <Profile />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default App;
