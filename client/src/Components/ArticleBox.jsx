import React, {useEffect, useState} from 'react'
import { fetchData } from '../functions/fetchdata'
import CarouselWrapper from './Carousel'

export default function ArticleBox(props) {
    let [result, setResult] = useState([])
    const {country, setCountry} = props

    useEffect(() => {
       fetchData(country).then((res) => setResult(res)) 
    }, [country])

    console.log('Thats the result: ',result)
    return (
        <div className='articleBox' onClick={() => setCountry('')}>
            <div className="articleBoxMenu">
                close (x)
            </div>
            <CarouselWrapper items={result} />
        </div>
    )
}
