const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('../client/'));

require('./routes/htmlRoutes')(app);

app.listen(PORT, function() {
  console.log(`(👉ﾟヮﾟ)👉 Now listening on port: ${PORT}`);
})