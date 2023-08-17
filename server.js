const express = require("express");
const path = require("path");

const app = express();

let port = 3000;

app.use("/src", express.static(path.resolve(__dirname, "app", "src")));
app.use("/styles", express.static(path.resolve(__dirname, "app", "styles")));

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "app", "index.html"));
});

app.listen(port, () => {
  console.log(`${port} Server running...`);
});
