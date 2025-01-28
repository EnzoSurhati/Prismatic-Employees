const express = require("express");
const app = express();
app.use(express.json());
const PORT = 3000;

app.use("/", require("./api/employees"))

app.listen(PORT, () => {
  console.log(`I am listening on port number ${PORT}`);
});