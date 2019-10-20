const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
mongoose.set('useFindAndModify', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose
  .connect(url, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to Mongo DataBase')
  })
  .catch(error => {
    console.log('error in connecting to Mongo DataBAase:', error.message)
  })

const personShma = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    minlength: 8,
    required: true,
    unique: true
  }
})
personShma.plugin(uniqueValidator)

personShma.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personShma)