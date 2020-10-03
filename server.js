const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(cors({origin: '*'}));
app.use('/public', express.static('public'))

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require('./src/routes/post.routes')(app);
require('./src/routes/media.routes')(app);
require('./src/routes/ads.routes')(app);
require('./src/routes/slider.routes')(app);
require('./src/routes/categories.routes')(app);

app.listen (3000);