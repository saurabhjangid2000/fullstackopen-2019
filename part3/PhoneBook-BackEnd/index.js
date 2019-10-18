const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
app.use(cors())

const bodyParser = require('body-parser')

app.use(bodyParser.json())


morgan.token('body', function(req) {
  return JSON.stringify(req.body)
})
app.use(
    morgan(
      ':method :url :status - :response-time ms - :res[content-length] - :body (:date[web])'
    )
  )


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

app.post('/api/persons', (request,response) => {
  const body = request.body

  if (!body.name || !body.number) {
      return response.status(400).json({ 
      error: 'content missing' 
      })
  }
  var i
  for(i=0;i<phonebook.length;i++){
      if(body.name === phonebook[i].name){
          return response.status(400).json({
              error: 'name must be unique'
          })
      }
  }
  
  const person = {
      id: Math.floor(Math.random()*1000000),
      name: body.name,
      number: body.number
  }
  persons = persons.concat(person)
  response.json(person)
})
  
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
