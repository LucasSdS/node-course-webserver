const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

const app = express();

hbs.registerPartials(`${__dirname}/views/partials`);
app.set('view engine', 'hbs');
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;

    fs.appendFile('server.log', log + '\n', err =>{
        if(err){
            console.log('error');
        }
    });

    next();
});

app.use((req, res, next) => {
    if(maintenance){
        res.render('maintenance.hbs', {
            pageTitle: 'Maintenance',
            welcome: 'COME BACK SOON'
        });
    }else{
        next();
    }
});

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', text => text.toUpperCase());

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcome: 'Site'
    });

});

app.get('/about', (req, res) => {
    res.render('about.hbs',{
        pageTitle: 'About Page'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs',{
        pageTitle: 'Projects Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'ERROR! ERROR! ERROR!'
    });
});

app.listen(port, () => {
    console.log(`Server is listening to port ${port}`);
});

const maintenance = false;
