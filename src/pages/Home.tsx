import React, {useCallback, useEffect, useRef, useState} from 'react';
import qs from 'qs';
import {useSelector} from "react-redux";
import {Link, useNavigate} from 'react-router-dom';

import { Categories, Sort, PizzaBlock, Skeleton, Pagination } from '../components';

import {useAppDispatch} from "../redux/store";
import {selectFilter} from "../redux/filter/selectors";
import {selectPizzaData} from "../redux/pizza/selectors";
import {setCategoryId, setCurrentPage} from "../redux/filter/slice";
import {fetchPizzas} from "../redux/pizza/asyncActions";

const Home: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isSearch = useRef(false)
    const isMounted = useRef(false)
    const {items, status} = useSelector(selectPizzaData)
    const {categoryId, sort, currentPage, searchValue} = useSelector(selectFilter)

    const onChangeCategory = useCallback((idx: number) => {
        dispatch(setCategoryId(idx))
    }, [])

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
    /*useEffect(() => {
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
                dispatch(fetchPizzas({} as SearchPizzaParams))
        }
    }, [categoryId, sort.sortProperty, searchValue, currentPage])*/

    useEffect(() => {
        getPizzas();

    }, [categoryId, sort.sortProperty, searchValue, currentPage])

    // Парсим параметры при первом рендере
     /*useEffect(() => {
         if (window.location.search) {
             const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams

             const sort = sortList.find((obj) => obj.sortProperty === params.sortBy)

             dispatch(setFilters({
                 searchValue: params.search,
                 categoryId: Number(params.category),
                 currentPage: Number(params.currentPage),
                 sort: sort || sortList[0]
             }))
         }
         isMounted.current = true
     }, [])*/

    const pizzas = items.map((obj: any) => (
            <PizzaBlock key={obj.id} {...obj}/>
    ))

    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
                <Sort value={sort} />
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