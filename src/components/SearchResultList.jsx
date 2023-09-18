import React from 'react'
import SearchResult from './SearResult'


export default function SearchResultList({result}){
    
    return (
        <div className='result-list' >
           {
            result.map((result, id) => {
                return <SearchResult result={result} key={id} />
            })
           }
           
        </div>
    )
}