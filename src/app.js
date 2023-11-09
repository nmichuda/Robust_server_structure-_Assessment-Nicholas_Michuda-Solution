const express = require("express");

const app = express();

const urlRouter = require("./urls/urls.router");
const useRouter = require("./uses/uses.router");

app.use("/urls", urlRouter); // Note: app.use
app.use("/uses", useRouter);


app.use(express.json());
  

app.use((request, response, next) => {
  next({
    message: `Not found: ${request.originalUrl}`
    });
});

// Error handler
app.use((error, req, res, next) => {
  console.error(error);
  const { status = 404, message = "Something went wrong!" } = error;
  res.status(status).json({ error: message });
});
// TODO: Add code to meet the requirements and make the tests pass.

module.exports = app;
