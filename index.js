if(process.env.NODE_ENV != 'production'){
    require('dotenv').config();
}
const express = require('express');
const app = express();
const port = 8000;
const bcrypt = require('bcrypt');

const users = [];

app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended : false }));

app.get('/', (req, res) => {
    res.render('index.ejs');
})

app.get('/login', (req, res) => {
    res.render('login.ejs');
})

app.get('/register', (req, res) => {
    res.render('register.ejs');
})

app.post('/register', async (req, res)=> {
    try{
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPass
        })
        res.redirect('/login');
    }
    catch{
        res.redirect('/register');
    }
})
app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`)
    }
   console.log(`Server is running on port: ${port}`)
})