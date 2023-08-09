import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from 'axios';

const FullPizza: React.FC = () => {
    const [pizza, setPizza] = useState<{
        imageUrl: string,
        title: string,
        price: number
    }>()
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchPizza() {
           try {
               const {data} = await axios.get('https://64ad3fd0b470006a5ec59bef.mockapi.io/items/' + id)
               setPizza(data)
           } catch (error) {
               alert('Ошибка при получении пиццы')
               navigate('/')
           }
        }
        fetchPizza()
    }, [])

    if (!pizza) {
        return <>Загрузка...</>
    }
    return (
        <div className='container'>
            <img src={pizza.imageUrl}/>
            <h2>{pizza.title}</h2>
            <h4>{pizza.price}р</h4>
        </div>
    );
};

export default FullPizza;