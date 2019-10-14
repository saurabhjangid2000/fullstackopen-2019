import React from 'react'

const ListofCountries = ({ countries, onCountriesSelect }) => {
  let listOfCountries = <p>Too many matches, please specify another filter</p>

  if (countries.length > 0 && countries.length <= 10) {
    listOfCountries = countries.map(country => (
      <p 
      key={country.alpha3Code}>
      {country.name}
      <button onClick={() => onCountriesSelect(country)}>
        show
      </button>
      </p>
    ))
  }

  return listOfCountries
}

export default ListofCountries
