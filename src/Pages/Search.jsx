import React from 'react'
import { DataContext } from '../context/Data.context'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RiUserSearchLine } from "react-icons/ri";


function Search() {
    const { allData, setFilteredData } = useContext(DataContext)
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')
    const [minPricePlaceholder, setMinPricePlaceholder] = useState('')
    const [maxPricePlaceholder, setMaxPricePlaceholder] = useState('')
    const [city, setCity] = useState('')
    const [bathrooms, setBathrooms] = useState('')
    const [bedrooms, setBedrooms] = useState('')
    const [type, setType] = useState('')
    const [propertyTypes, setPropertyTypes] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (allData.length > 0) {
            const prices = allData.map(item => parseFloat(item.price))
            const minPriceFromApi = Math.min(...prices)
            const maxPriceFromApi = Math.max(...prices)

            setMinPricePlaceholder(minPriceFromApi)
            setMaxPricePlaceholder(maxPriceFromApi)

            const types = [... new Set(allData.map(item => (item.property_type)))]

            setPropertyTypes(types)
        }
    }, [allData]);

    const handleFilter = () => {
        console.log('Filtering data with:', { minPrice, maxPrice, city, bathrooms, bedrooms, type })
        const min = minPrice ? parseFloat(minPrice) : minPricePlaceholder
        const max = maxPrice ? parseFloat(maxPrice) : maxPricePlaceholder

        const filterPrice = allData.filter(item => {
            const price = parseFloat(item.price)
            const checkPrice = price >= min && price <= max
            const checkCity = city ? item.city.toLowerCase().includes(city.toLowerCase()) : true
            const checkBathrooms = bathrooms ? item.bathrooms === bathrooms : true
            const checkBedrooms = bedrooms ? item.bedrooms === bedrooms : true
            const checkType = type ? item.property_type === type : true

            return checkPrice && checkCity && checkBathrooms && checkBedrooms && checkType

        })
        console.log('Filtered Data:', filterPrice);
        setFilteredData(filterPrice)
 navigate('/vivienda')
    }

    return (
        <div className='search-container'>
            
            <h1 className='search-title'>Busca tu casa <RiUserSearchLine className='search-title-icon'/></h1>
            <label className='search-label'>
            Precio Mínimo
            </label>
                    <input
                    className='search-input'
                        type='number'
                        value={minPrice || ''}
                        onChange={(e) => setMinPrice(e.target.value)}
                        placeholder={minPricePlaceholder} />
                
                <label className='search-label'>
                    Precio Máximo</label>
                    <input
                     className='search-input'
                        type='number'
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        placeholder={maxPricePlaceholder} />
               
            {/*city*/}
                <label className='search-label'>
                    City</label>
                    <input
                     className='search-input'
                        type='text'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder='City' />
                
            {/*bathrooms*/}
                <label className='search-label'>
                    Baños</label>
                    <input
                     className='search-input'
                        type='text'
                        value={bathrooms}
                        onChange={(e) => setBathrooms(e.target.value)}
                        placeholder='Baños' />
               
            {/*bedrooms*/}
           
                <label className='search-label'>
                    Dormitorios</label>
                    <input
                     className='search-input'
                        type='text'
                        value={bedrooms}
                        onChange={(e) => setBedrooms(e.target.value)}
                        placeholder='Dormitorios' />
                
            {/*Property*/}
                <label className='search-label'>
                    Tipo de propiedad </label>
                    <select value={type} onChange={(e) => setType(e.target.value)} className='search-select'>
                        <option value="">Seleccione un tipo</option>
                        {propertyTypes.map((propertyType, index) => (
                            <option key={index} value={propertyType} className='search-option'>
                                {propertyType}
                            </option>
                        ))}
                    </select>
                

                <button onClick={handleFilter} className='button-search'>Buscar</button>
        </div>
        
    )
}

export default Search

