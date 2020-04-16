const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

function logRequests(request, response, next){
  const {method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.log(logLabel);

  return next(); //Próximo middleware

}

function validateProjectId(request, response, next){

  const {id} = request.params;

  if(!isUuid(id)) {
    return response.status(400).json({error: "Invalid project ID."});
  }

  return next();

}

app.use(logRequests);


app.get("/repositories", (request, response) => {
  
  const {title} = request.query;

  const results = title
    ? repositories.filter(project => repositories.title.includes(title))
    : repositories;

  return response.json(results);

});

app.post("/repositories", (request, response) => {
  
  const {url,title,techs,likes=0} = request.body;
  const reposit = {id: uuid(),url, title, techs,likes};
  repositories.push(reposit);

  return response.json(reposit);


});

app.put("/repositories/:id", (request, response) => {
  // TODO
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
