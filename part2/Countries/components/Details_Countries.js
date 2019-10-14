import React from 'react'

const Details_Countries = props => {
  return (
    <>
      <h1>{props.name}</h1>
      <p>Capital : {props.capital}</p>
      <p>Population : {props.population}</p>
      <h2>Languages : </h2>
      <ul>
        {props.languages.map(lang => (
          <li 
          key={lang.iso639_1}>
          {lang.name}
          </li>
        )
        )
        }
      </ul>
      <img src={props.flag} alt='Offical flag of {props.name}' />
    </>
  )
}

export default Details_Countries
