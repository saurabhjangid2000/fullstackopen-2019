const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
app.use(cors())

morgan.token('body', function(req) {
  return JSON.stringify(req.body)
})
app.use(
    morgan(
      ':method :url :status - :response-time ms - :res[content-length] - :body (:date[web])'
    )
  )
const bodyParser = require('body-parser')

app.use(bodyParser.json())


let persons =[
          {
            "name": "Arto Hellas",
            "number": "040-123456",
            "id": 1
          },
          {
            "name": "Martti Tienari",
            "number": "040-123456",
            "id": 2
          },
          {
            "name": "Arto Järvinen",
            "number": "040-123456",
            "id": 3
          },
          {
            "name": "Lea Kutvonen",
            "number": "040-123456",
            "id": 4
          },
          {
            "name": "Kanttu Vei",
            "number": "040-123456",
            "id": 5
          }
        ]

app.get('/api/persons',(request,response) => {
    response.json(persons)
})

app.get('/info',(request,response) => {
    let html = `PhoneBook has info for ${persons.length} person`+`<p>${Date()}</p>`
    response.send(html)
})

app.get('/api/persons/:id',(request,response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id == id)
    
    if (person){
        response.json(person)
    }else{
        response.status(404).end()
    }
})

app.delete('/api/persons/:id',(request,response) => {
  const id = Number(request.params.id)
  persons=persons.filter(person => person.id !== id)
  response.status(204).end()  
})
  
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})






const validateBodyPerson = body => {
    if (!body.name) {
      return 'name missing'
    }
  
    if (!body.phone) {
      return 'phone missing'
    }
  }
  

app.post('/api/persons', (request, response, next) => {
    const body = request.body
  
    const error = validateBodyPerson(body)
    if (error) {
      return response.status(400).json({
        error: error
      })
    }
    const person = new Person({
      name: body.name,
      phone: body.phone
    })
  
    person
      .save()
      .then(savedPerson => savedPerson.toJSON())
      .then(saveAndFormattedPerson => response.json(saveAndFormattedPerson))
      .catch(error => next(error))
  })