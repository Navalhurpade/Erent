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

function App() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) parseUser(token);
  }, []);

  const parseUser = (token) => {
    localStorage.setItem("userToken", token);
    const parsedUser = jwtDecode(token);
    setUser(parsedUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userToken");
  };

  return (
    <Router>
      <Switch>
        <AuthContext.Provider value={{ user, parseUser, logout, location }}>
          <NavBar />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/post-edit" component={CreatPost} />
          <Route exact path="/post-details" component={PostDetails} />
          <Redirect to="/" />
        </AuthContext.Provider>
      </Switch>
    </Router>
  );
}

export default App;
