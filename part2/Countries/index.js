import React from 'react'
import ReactDOM from 'react-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryDetail from './components/Details_Countries'
import ListofCountaries from './components/ListofCountaries'

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [CountriesSelect, setCountriesSelect] = useState(null)

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/name/' + filter)
      .then(response => setCountries(response.data))
      .catch(() => setCountries([]))
  }, [filter])

  return (
    <>
      <span>Find Countries </span>
      <input type='text' 
       onChange={event => 
       setFilter(event.target.value)}
      />

      {CountriesSelect ? (
        <CountryDetail {...CountriesSelect} />
      ) 
      : (
        <ListofCountaries
          countries={countries}
          onCountriesSelect={country => setCountriesSelect(country)}
        />
      )}
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))


