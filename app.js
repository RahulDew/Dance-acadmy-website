const express = require('express');
const app = express();
const path = require('path');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/contactDance');
}
const port = 8000;


// Defining Mongoose scema
const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  desc: String
});

const Contact = mongoose.model('Contact', contactSchema);


// express specific stuff
app.use('/static', express.static('static')) // for serviing static files
app.use(express.urlencoded());
//pug specific stuff
app.set('view engine', 'pug') //set the templet engine as pug
app.set('views', path.join(__dirname, 'views')) //set the views directory

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  const params = { }  
  res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res) => {
  const params = { }  
  res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res) => {
  var myData = new Contact(req.body);
  myData.save().then(() => {
    res.send(`this data item has been sent to the database`)
  }).catch(() => {
    res.status(400).send("Item was not saved to the Database")
  });
  // res.status(200).render('contact.pug');
})

app.listen(port, ()=>{
    console.log(`the application started successfully on ${port}`);
})