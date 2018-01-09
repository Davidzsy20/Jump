const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const axios = require('axios');
const bodyParser = require('body-parser') ;
const path = require('path');
const app = express();
const server = app.listen(3000, function() {
    const host = server.address().address;
    const port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
  });

app.use(partial());
// Parse JSON (uniform resource locators)

app.use(bodyParser.json());

// Parse forms (signup/login)

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/src'));
app.use(cookieParser());