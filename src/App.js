import React from "react";
import './../src/scss/app.scss'
import Header from "./components/Header";
import {Routes, Route} from "react-router-dom";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

function App() {
    return (
        <div className="wrapper">
                <Header/>
                <div className="content">
                    <Routes>
                        <Route path='/' element={<Home/>}/>
                        <Route path='/cart' element={<Cart/>}/>
                        <Route path='*' element={<NotFound/>}/>
                    </Routes>
                </div>
        </div>
    );
}

export default App;
