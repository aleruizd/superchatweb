const express = require('express');
const app = express();

app.use(require("./root"));
app.use(require("./login"));
app.use(require("./logout"));
app.use(require("./register"));
app.use(require("./chat"));
app.use(require("./friend-request"));
app.use(require("./contact"));
app.use(require("./conversation"));
app.use(require("./message"));
app.use(require("./unreaded-messages"));


module.exports = app;
