import React, {useEffect, useRef, useState} from 'react';
import qs from 'qs';
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from 'react-router-dom';
import {selectFilter, setCategoryId, setCurrentPage, setFilters} from '../redux/slices/filterSlice';
import Categories from "../components/Categories";
import Sort, {sortList} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import {fetchPizzas, selectPizzaData} from "../redux/slices/pizzaSlice";

const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isSearch = useRef(false)
    const isMounted = useRef(false)
    const {categoryId, sort, currentPage, searchValue} = useSelector(selectFilter)
    const {items, status} = useSelector(selectPizzaData)

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = (number) => {
        dispatch(setCurrentPage(number))
    }

    const getPizzas = async () => {
        const sortBy = sort.sortProperty.replace('-', '')
        const order = sort.sortProperty.includes('_') ? 'asc' : 'desc'
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''

        dispatch(
            fetchPizzas({
                sortBy,
                order,
                category,
                search,
                currentPage
            }))

        window.scrollTo(0, 0)
    }

    useEffect(() => {
        getPizzas();

    }, [])

    // Если был первый рендер, то проверяем URL - параметры и сохраняем в Редаксе
    /* useEffect(() => {
         if (window.location.search) {
             const params = qs.parse(window.location.search.substring(1))

             const sort = sortList.find(obj => obj.sortProperty === params.sortProperty)

             dispatch(setFilters({
                 ...params,
                 sort
             }))
         }
         isSearch.current = true
     }, [])*/

    // Если был первый рендер, то запрашиваем пиццы
    /*
        useEffect(() => {
            if (!isSearch.current) {
                getPizzas()
            }
            isSearch.current = false
        }, [categoryId, sort.sortProperty, searchValue, currentPage])
    */

    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)

    const pizzas = items.map((obj) => (
        <Link key={obj.id} to={`/pizza/${obj.id}`}>
            <PizzaBlock {...obj}/>
        </Link>
    ))

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {
                status === 'error' ? <div className="content__error-info">
                    <h2>Произошла ошибка <span>😕</span></h2>
                    <p>К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
                </div> : <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
            }

            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </div>
    )
}

export default Home