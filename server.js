const express = require('express');
const app = express();
const serverConfig = require('./configs/server.config');

app.listen(serverConfig.PORT, () => console.log(`App running on : ${serverConfig.PORT}`))
