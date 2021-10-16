const express = require("express");
const morgan = require("morgan");
const methodOverride=require('method-override')
const exphbs = require("express-handlebars");
const path = require("path");
const route = require("./routes");
const db = require("./config/db");
//connection to db
db.connect();

const app = express();
const port = 3000;

///
app.use(methodOverride('_method'))


//
app.use(express.static(path.join(__dirname, "public")));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
//HTTP logger
// app.use(morgan("combined"));

//template engine
app.engine(
  "hbs",
  exphbs({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

//route init
route(app);
//

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
