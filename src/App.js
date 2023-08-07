import React from "react";
import './../src/scss/app.scss'
import Header from "./components/Header";
import {Routes, Route, Outlet} from "react-router-dom";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import FullPizza from "./pages/FullPizza";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import MainLayout from "./layouts/MainLayout";


function App() {
    return (
        <Routes>
            <Route path='/' element={<MainLayout/>}>
                <Route path='' element={<Home/>}/>
                <Route path='cart' element={<Cart/>}/>
                <Route path='pizza/:id' element={<FullPizza/>}/>
                <Route path='*' element={<NotFound/>}/>
            </Route>
        </Routes>
    );
}

export default App;
