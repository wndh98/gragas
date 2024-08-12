import React from "react";
import ReactDOM from "react-dom/client";
import App from "./layout/App";
import reportWebVitals from "./reportWebVitals";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Header/>
      <App />
    <Footer/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
