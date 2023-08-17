import Loadable from 'react-loadable';
import React, {Suspense} from 'react';
import {Routes, Route} from "react-router-dom";

import Home from "./pages/Home";
// import Cart from "./pages/Cart";
// import FullPizza from "./pages/FullPizza";
// import NotFound from "./pages/NotFound";

import './../src/scss/app.scss'
import MainLayout from "./layouts/MainLayout";

/*const Cart = React.lazy(() => import(/!* webpackChunkName: "Cart" *!/'./pages/Cart'));*/
const Cart = Loadable({
    loader: () => import(/* webpackChunkName: "Cart" */'./pages/Cart'),
    loading: () => <div>Идет загрузка корзины...</div>,
})


const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */'./pages/FullPizza'));
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */'./pages/NotFound'));


function App() {
    return (
        <Routes>
            <Route path='/' element={<MainLayout/>}>
                <Route path='' element={<Home/>}/>
                {/*<Route path='cart' element={<Cart/>}/>*/}
                {/*<Route path='pizza/:id' element={<FullPizza/>}/>*/}
                {/*<Route path='*' element={<NotFound/>}/>*/}
                <Route
                    path='cart'
                    element={
                    <Suspense fallback={<div>Идет загрузка корзины...</div>}>
                        <Cart/>
                    </Suspense>}
                />
                <Route
                    path='pizza/:id'
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