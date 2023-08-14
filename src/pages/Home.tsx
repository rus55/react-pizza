import React, {useEffect, useRef, useState} from 'react';
import qs from 'qs';
import {useSelector} from "react-redux";
import {Link, useNavigate} from 'react-router-dom';
import FilterSlice, {selectFilter, setCategoryId, setCurrentPage, setFilters} from '../redux/slices/filterSlice';
import Categories from "../components/Categories";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import {fetchPizzas, SearchPizzaParams, selectPizzaData} from "../redux/slices/pizzaSlice";
import {useAppDispatch} from "../redux/store";
import {sortList} from "../components/Sort";

const Home: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isSearch = useRef(false)
    const isMounted = useRef(false)
    const {categoryId, sort, currentPage, searchValue} = useSelector(selectFilter)
    const {items, status} = useSelector(selectPizzaData)

    const onChangeCategory = (idx: number) => {
        dispatch(setCategoryId(idx))
    }

    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page))
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
                currentPage: String(currentPage)
            }))

        window.scrollTo(0, 0)
    }

    // Если изменили параметры и был первый рендер
    useEffect(() => {
        if (isMounted.current) {
            const params = {
                categoryId: categoryId > 0 ? categoryId : null,
                sortProperty: sort.sortProperty,
                currentPage
            }

            const queryString = qs.stringify(params, {skipNulls: true})

            navigate(`/?${queryString}`)
        }
        if (!window.location.search) {
                dispatch(fetchPizzas({}))
        }
    }, [categoryId, sort.sortProperty, searchValue, currentPage])

    useEffect(() => {
        getPizzas();

    }, [categoryId, sort.sortProperty, searchValue, currentPage])

    // Парсим параметры при первом рендере
     useEffect(() => {
         if (window.location.search) {
             const params = (qs.parse(window.location.search.substring(1)) as unknown) as SearchPizzaParams

             const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty)

             if (sort) {
                 params.sort = sort
             }

             dispatch(setFilters(params))
         }
         isMounted.current = true
     }, [])

    const pizzas = items.map((obj: any) => (
        <Link key={obj.id} to={`/pizza/${obj.id}`}>
            <PizzaBlock {...obj}/>
        </Link>
    ))

    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory} getCategories={()=>{}/>
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