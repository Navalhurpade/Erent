import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import AuthContext from "./Components/AuthContext";
import HomePage from "./pages/homePage/HomePage";
import CreatPost from "./pages/creatPost/CreatPost";
import useLocation from "./hooks/useLocation";
import PostDetails from "./pages/PostDetails/PostDetails";
import NavBar from "./Components/navbar/NavBar";
import { connect } from "./api/apiServer";
import ChatPage from "./pages/chatPage/ChatPage";
import chatsApi from "./api/chats";

function App() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    //Trying to find persisted User !
    const foundToken =
      localStorage.getItem("userToken") || sessionStorage.getItem("userToken");

    if (foundToken) {
      const parsedUser = jwtDecode(foundToken);
      setUser(parsedUser);
      connect(parsedUser);
    }
  }, []);

  const login = (token, rememberMe) => {
    storeUser(token, rememberMe);
    const parsedUser = jwtDecode(token);
    setUser(parsedUser);
    connect(parsedUser);
  };

  const storeUser = (token, rememberMe) => {
    if (rememberMe) localStorage.setItem("userToken", token);
    else sessionStorage.setItem("userToken", token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userToken");
    sessionStorage.removeItem("userToken");
  };

  return (
    <Router>
      <Switch>
        <AuthContext.Provider value={{ user, login, logout, location }}>
          <NavBar />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/post-edit" component={CreatPost} />
          <Route exact path="/post-details" component={PostDetails} />
          <Route exact path="/chat-page" component={ChatPage} />
          {/* <Redirect to="/" /> */}
        </AuthContext.Provider>
      </Switch>
    </Router>
  );
}

export default App;
