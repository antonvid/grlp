const express = require('express');
const app = express();
const port = 8080;

app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

require('./routes')(app);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});