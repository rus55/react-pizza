import React, {useEffect, useRef, useState} from 'react';
import qs from 'qs';
import axios from 'axios';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom';
import {setCategoryId, setCurrentPage, setFilters} from '../redux/slices/filterSlice';
import Categories from "../components/Categories";
import Sort, {sortList} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import {SearchContext} from "../App";
import {isAllOf} from "@reduxjs/toolkit";

const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isSearch = useRef(false)
    const isMounted = useRef(false)

    const {categoryId, sort, currentPage} = useSelector(state => state.filter)

    const {searchValue} = React.useContext(SearchContext)
    let [items, setItems] = useState([])
    const [isLoading, setIsloading] = useState(true)

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = (number) => {
        dispatch(setCurrentPage(number))
    }

    const fetchPizzas = async () => {
        setIsloading(true)

        const sortBy = sort.sortProperty.replace('-', '')
        const order = sort.sortProperty.includes('_') ? 'asc' : 'desc'
        const category =  categoryId > 0 ? `category=${categoryId}` : ''
        const search =  searchValue ? `&search=${searchValue}` : ''

        try {
            const res = await axios.get(
                `https://64ad3fd0b470006a5ec59bef.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`
            )
            setItems(res.data)
            setIsloading(false)
        } catch (error) {
            setIsloading(false)
            console.log('ERROR', error)
            alert('Ошибка при получении пицц')
        } finally {
            setIsloading(false)
        }
        
        window.scrollTo(0, 0)
    }
    
    // Если изменили параметры и был первый рендер
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage
            })
            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [categoryId, sort.sortProperty, searchValue, currentPage])

    // Если был первый рендер, то проверяем URL - параметры и сохраняем в Редаксе
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))

            const sort = sortList.find(obj => obj.sortProperty === params.sortProperty)

            dispatch(setFilters({
                ...params,
                sort
            }))
        }
        isSearch.current = true
    }, [])

    // Если был первый рендер, то запрашиваем пиццы
    useEffect(() => {
        if (!isSearch.current) {
            fetchPizzas()
        }
        isSearch.current = false
    }, [categoryId, sort.sortProperty, searchValue, currentPage])

    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)

    const pizzas = items.filter(obj => {
        if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
            return true
        }
        return false
    }).map(obj => <PizzaBlock key={obj.id} {...obj} />)

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">{isLoading ? skeletons : pizzas}</div>
            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    )
}

export default Home