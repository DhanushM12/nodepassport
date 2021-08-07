const express = require('express');
const app = express();
const port = 8000;

app.set('view-engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index.ejs');
})

app.get('/login', (req, res) => {
    res.render('login.ejs');
})

app.get('/register', (req, res) => {
    res.render('register.ejs');
})

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`)
    }
   console.log(`Server is running on port: ${port}`)
})