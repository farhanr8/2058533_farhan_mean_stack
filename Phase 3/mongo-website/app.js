let app = require("express")();
let bodyparser = require("body-parser");
let cors = require("cors");
let courseRouter = require("./router/course.router");
let mongoose = require("mongoose");

let url = "mongodb://localhost:27017/tcsmean";

// passing value through the form POST method
app.use(bodyparser.urlencoded( {extended:true} ));   
app.use(bodyparser.json());                        
app.use(cors());

mongoose.connect(url).then(res=>console.log("connected")).catch(err=>console.log(err));

app.use("/api/course", courseRouter)

app.get('/', (request,response) => {
  response.sendFile(__dirname + '/html/index.html');
})

app.get('/addCourse', (request,response) => {
  response.sendFile(__dirname + '/html/addCourse.html');
}) 

app.get('/listCourses', (request,response) => {
  response.sendFile(__dirname + '/html/listCourses.html');
}) 

app.get('/deleteCourse', (request,response) => {
  response.sendFile(__dirname + '/html/deleteCourse.html');
}) 

app.get('/updateCourse', (request,response) => {
  response.sendFile(__dirname + '/html/updateCourse.html');
}) 


app.listen(9090, () => console.log("Server running on port number 9090"));