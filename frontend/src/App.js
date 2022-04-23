import Register from "./Components/Register";
import React from 'react';
import MyNavbar from "./Components/MyNavbar";
import News from "./Components/Tabs/News"
import Login from "./Components/Login";

function App() {
  return (
    <div className="App">
      <MyNavbar/>
      <News />
    </div>
  );
}

export default App;
