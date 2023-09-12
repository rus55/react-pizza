import Loadable from 'react-loadable';
import React, {Suspense} from 'react';
import {Routes, Route} from "react-router-dom";

import Home from "./pages/Home";

import './../src/scss/app.scss'
import MainLayout from "./layouts/MainLayout";

const Cart = Loadable({
    loader: () => import(/* webpackChunkName: "Cart" */'./pages/Cart'),
    loading: () => <div>Идет загрузка корзины...</div>,
})

const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */'./pages/FullPizza'));
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */'./pages/NotFound'));

function App() {
    return (
        <Routes>
            <Route path='/react-pizza' element={<MainLayout/>}>
                <Route path='/react-pizza' element={<Home/>}/>
                <Route
                    path='/react-pizza/cart'
                    element={
                    <Suspense fallback={<div>Идет загрузка корзины...</div>}>
                        <Cart/>
                    </Suspense>}
                />
                <Route
                    path='/react-pizza/pizza/:id'
                    element={
                        <Suspense fallback={<div>Идет загрузка пицц...</div>}>
                            <FullPizza/>
                        </Suspense>}
                />
                <Route
                    path='*'
                    element={
                        <Suspense fallback={<div>Идет загрузка пицц...</div>}>
                            <NotFound/>
                        </Suspense>}
                />
            </Route>
        </Routes>
    );
}

export default App;