import React, { useState, useEffect } from 'react'
import personService from './services/person'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  const [notify, setNotify] = useState(null)
  const [successful, setSuccessful] = useState(false)

  const PersonalDetails = props => (
    <form onSubmit={props.action}>
        <div>
            Name : <input value={props.name} onChange={props.nameHandler}/>
        </div>
        <div>
            Number : <input value={props.number} onChange={props.numberHandler}/>
        </div>
        <div>
            <button type="submit">ADD</button>
        </div>
    </form>
)

  useEffect(() => {
      personService.getAll().then(initialPersons => setPersons(initialPersons))}, [])


const Notification = ({ notify, successful }) => {
    if (notify === null) {
        return null
    }

    const className = successful ? 'successful' : 'error'

    return (
        <div className={className}>
            {notify}
        </div>
    )
}

const Filter = ({ value, handler }) => (
    <div>
        Filter shown with :  <input value={value} onChange={handler}/>
    </div>
)

const Person = ({ person, remove }) => (
    <div>{person.name} {person.number}
        <button onClick={remove}>Delete</button>
    </div>
)

const Persons = ({ list, deleteHandle }) => {
    const numbers = () => list.map(person =>
        <Person key={person.id} person={person} remove={() => deleteHandle(person.id)}/>
    )

    return (
        <div>
            {numbers()}
        </div>
    )
}
    const deletePerson = id => {
        const person = persons.find(n => n.id === id)
        const result = window.confirm(`Delete ${person.name}`)

        if (result) {
            const deletedPerson = person.name
            personService.remove(id)
            setPersons(persons.filter(n => n.id !== id))
            setSuccessful(true)
            setNotify(`Deleted ${deletedPerson}`)
            setTimeout(() => {
                setNotify(null)
            }, 3000)
        }
    }

    const numbersToShow = persons.filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase()))

    const updateNumberOf = id => {
        const person = persons.find(p => p.id === id)
        const changedPerson = { ...person, number: newNumber }

        personService.update(changedPerson).then(returnedPerson => {
            setPersons(persons.map(p => p.id !== id ? p : returnedPerson))
        }).catch(error => {
            setSuccessful(false)
            setNotify(`Information of ${person.name} has already been removed from server`)
            setTimeout(() => {
                setNotify(null)
            }, 3000)
            setPersons(persons.filter(p => p.id !== id))
            return false
        })

        setSuccessful(true)
        setNotify(`Changed the number of ${person.name} to ${newNumber}`)
        setTimeout(() => {
            setNotify(null)
        }, 3000)
    }

    const addPerson = (event) => {
        event.preventDefault()
        if (persons.map(p => p.name).includes(newName)) {
            const result = window.confirm(`${newName} already listed, replace old number with new?`)
            if (!result) return false
            const person = persons.find(p => p.name === newName)
            updateNumberOf(person.id)
            return false
        }

        const personObject = {
            name: newName,
            number: newNumber,
        }

        personService.create(personObject).then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
        })

        setSuccessful(true)
        setNotify(`Added ${newName}`)
        setTimeout(() => {
            setNotify(null)
        }, 3000)
    }

    const OnChangeNameHandle = event => setNewName(event.target.value)
    const OnChangeNumberHandle = event => setNewNumber(event.target.value)
    const OnChangeFilterHandle = event => setNewFilter(event.target.value)

    return (
        <div>
            <h2>PhoneBook</h2>
            <Notification notify={notify} successful={successful} />
            <Filter value={filter} handler={OnChangeFilterHandle}/>
            <h3>Add New</h3>
            <PersonalDetails action={addPerson} name={newName} nameHandler={OnChangeNameHandle} number={newNumber} numberHandler={OnChangeNumberHandle}/>
            <h3>Numbers</h3>
            <Persons list={numbersToShow} deleteHandle={deletePerson}/>
        </div>
    )

}

export default App
