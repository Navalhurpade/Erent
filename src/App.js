import React from "react";
import NavBar from "./Components/navbar/NavBar";

var firebaseConfig = {
  apiKey: "AIzaSyD1lgowDJtpdJd4os38ukDKA1oZ5c0Ic0E",

  authDomain: "erent-7aa7e.firebaseapp.com",

  projectId: "erent-7aa7e",

  storageBucket: "erent-7aa7e.appspot.com",

  messagingSenderId: "699243639650",

  appId: "1:699243639650:web:4413ff6ed5fa0233eeb23b",

  measurementId: "G-25NETYBE95",
};

function App() {
  return (
    <header>
      <NavBar />
    </header>
  );
}

export default App;
