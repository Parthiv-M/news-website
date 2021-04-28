const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const axios = require('axios'); 

const port = process.env.PORT || 3000;

const app = express();

// setting the view engine
app.set('view engine', 'hbs');

// express middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + '/public'));

app.use(require('express-session')({
    secret: 'this is a secret',
    resave: false,
    saveUninitialized: false
}))    

// serves the headlines page
app.get('/', async (req, res) => {

    var headlines = []

    var newsList = []

    // fetch data from the external API
    await axios.get('https://newsapi.org/v2/top-headlines?country=in&apiKey=' + process.env.API_KEY)
        .then((res) => {
            headlines.push(res.data.articles);    
            headlines[0].forEach((headline) => {
                newsList.push(
                    news = {
                        title: headline.title,
                        urlToImage: headline.urlToImage,
                        description: headline.description,
                        url: headline.url
                    }
                )
            });
        })
        .catch((err) => {
            res.status(400).send(err);
        })
    res.render('headlines_page.hbs', { news : newsList });
});

// listening on $PORT
app.listen(port, () => {
    console.log('Server up on port ' + port);
})


