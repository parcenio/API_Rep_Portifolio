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

app.put("/repositories/:id", validateProjectId, (request, response) => {
  
  const {id} = request.params;
  const {url, title, techs } = request.body;

  const repIndex = repositories.findIndex(reposit => reposit.id=== id);

  const reposit = { id, url, title, techs, }

  repositories[repIndex]= reposit;

  return response.json(reposit);

});

app.delete("/repositories/:id", validateProjectId, (request, response) => {

  const {id}=request.params;
 
  const repIndex = repositories.findIndex(reposit => reposit.id === id);

  repositories.splice(repIndex,1)

});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
