import React from 'react';
import MyNavbar from "./Components/MyNavbar";
import News from './Components/Tabs/News';
import Currency from "./Components/Currency";
import {Route, BrowserRouter, Switch} from 'react-router-dom';

const App = () => {
    return (
        <BrowserRouter>
            <MyNavbar />
            <Switch>
                <Route exact path="/">
                    <News />
                </Route>
                <Route path="/currency">
                    <Currency />
                </Route>
                {/*<Route path="/profile">*/}
                {/*    <Profile />*/}
                {/*</Route>*/}
            </Switch>
        </BrowserRouter>
    )
}
export default App;
