import React from 'react'
import styles from './Search.module.scss'

const Search = ({searchValue, setSearchValue}) => {
    return (
        <div className={styles.root}>
            <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 50 50"
                 height="50px" id="Layer_1" version="1.1" viewBox="0 0 50 50" width="50px">
                <rect fill="none" height="50" width="50"/>
                <circle cx="21" cy="20" fill="none" r="16" stroke="#000000" stroke-linecap="round"
                        stroke-miterlimit="10" stroke-width="2"/>
                <line fill="none" stroke="#000000" stroke-miterlimit="10" stroke-width="4" x1="32.229" x2="45.5"
                      y1="32.229" y2="45.5"/>
            </svg>
            <input
                value={searchValue}
                onChange={event => setSearchValue(event.target.value)}
                className={styles.input}
                placeholder='Поиск пиццы ...'
            />
            {searchValue &&
                <svg onClick={() => setSearchValue('') } className={styles.clearIcon} xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 0 48 48"
                     width="48">
                    <path
                        d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z"/>
                    <path d="M0 0h48v48h-48z" fill="none"/>
                </svg>
            }
        </div>
    )
}

export default Search