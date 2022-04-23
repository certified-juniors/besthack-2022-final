import Register from "./Components/Register";
import React from 'react';
import MyNavbar from "./Components/MyNavbar";
import Currency from "./Components/Currency";
import Login from "./Components/Login";

import {BrowserRouter, Route, Switch} from "react-router-dom";

const App = () =>
{
  return(
    <BrowserRouter>
      <MyNavbar />
      <Switch>
        {/*<Route path = "/" exact>*/}
        {/*  <News />*/}
        {/*</Route>*/}
        <Route path = "/currency">
          <Currency/>
        </Route>
        {/*<Route path = "/profile">*/}
        {/*  <Profile/>*/}
        {/*</Route>*/}
      </Switch>
    </BrowserRouter>
  )
}

export default App;
