const app = require("./app");

const PORT = 3000;

app.listen(process.env.PORT || PORT, () => {
  console.log(
    `App listening at http://localhost:${process.env.PORT || PORT} 🚀`
  );
});