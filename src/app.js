const express = require('express')
const server = express()
const path = require('path');
const { port } = require('../config/default')
const router = require('./routes')
const blockedRoutes = ['/database/createArticle','/database/deleteArticle','/database/updateArticle'];
const { loginVerify } = require('./lib/common')
const cors = require('cors')
const {loggingEngine} = require('./lib/common')
const bodyParser = require("body-parser");
console.log(__dirname)
const localRoot = __dirname === '/opt/personalwebsitenode/src' ? '/opt/personalwebsitereact/build'
                    : 'D:/Documents/Programming/Node/PersonalWebsite/WebsiteReact/build'
console.log(localRoot)
server.use(express.static(localRoot));

const unless = (routes,middleware) => (req,res,next) => {
    routes.some(route => route === req.path) ? middleware(req,res,next) : next();
}

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.options(cors())
server.use(cors())
loggingEngine(server)

server.use(unless(blockedRoutes,loginVerify))
server.get('*', function (req, res) {
    res.sendFile(`${localRoot}/index.html`);
  });
router(server)

server.listen(port, () => console.log(`Example app listening at ${port}`))
