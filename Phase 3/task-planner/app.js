let fs = require('fs');
let http = require('http');
let url = require('url');

let tasksFileName = "tasks.json";

let myHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h2 style="text-align: center;">Task Planner</h2>
    <h3>Add Task</h3>
    <form action="/addTask" method="GET">
        <label>Employee Id: </label><br>
        <input type="number" name="empId" required><br>
        <label>Task Id: </label><br>
        <input type="number" name="taskId" required><br>
        <label>Task: </label><br>
        <input type="text" name="task" required><br>
        <label>Deadline: </label><br>
        <input type="date" name="deadline" required><br>
        <br>
        <button type="submit">ADD</button>
        <button type="reset">RESET</button>
    </form>
    <h3>Delete Task</h3>
    <form action="/deleteTask" method="GET">
        <label>Task Id: </label>
        <input type="number" name="taskId" required><br>
        <br>
        <button type="submit">DELETE</button>
        <button type="reset">RESET</button>
    </form>
    <h3>List All Tasks</h3>
    <form action="/displayTasks">
        <button type="submit">VIEW TASKS</button>
    </form>
    <br>
`;

let server = http.createServer((request,response)=> {
    let urlInfo = url.parse(request.url,true);
    let pathname = urlInfo.pathname;
  
    if (request.url == "/") {
        let myHtmlEnd = `
            </body>
            </html>
        `;
        response.write(myHtml+myHtmlEnd);
    } 
    
    else if (pathname == "/addTask") {
        let urlData = urlInfo.query;
        let newTask = {
            empId:urlData.empId,
            taskId:urlData.taskId,
            task:urlData.task,
            deadline:urlData.deadline
        };
        let myTasks = [];
        if(fs.readFileSync(tasksFileName) != ""){
            myTasks = JSON.parse(fs.readFileSync(tasksFileName))
        }

        let uniqueId = myTasks.find(t=>t.taskId == newTask.taskId);
        if(uniqueId != undefined){
            let myHtmlEnd = `
                <p>Task ID:${newTask.taskId} already exist!</p>
                </body>
                </html>
            `;
            response.write(myHtml+myHtmlEnd);
        }
        else{
            myTasks.push(newTask);
            fs.writeFile(tasksFileName, JSON.stringify(myTasks, null, '\t'), {flag:"w"}, err => {
                if(!err){
                    console.log("Task stored successfully!");
                }
            });
            let myHtmlEnd = `
                <p> Added task ${newTask.taskId} </p>
                </body>
                </html>
            `;
            response.write(myHtml+myHtmlEnd);
        }
        
    } 
  
    else if (pathname == "/deleteTask") {
        let urlData = urlInfo.query;
        let deleteId = urlData.taskId;
        let myTasks = [];
        if(fs.readFileSync(tasksFileName) != ""){
            myTasks = JSON.parse(fs.readFileSync(tasksFileName))
        }
        let result = myTasks.find(l=>l.taskId == deleteId);
        if(result != undefined){
            let index = myTasks.findIndex(t => t.taskId === deleteId);
            if (index !== undefined) 
                myTasks.splice(index, 1);
            fs.writeFile(tasksFileName, JSON.stringify(myTasks, null, '\t'), {flag:"w"}, err => {
                if(!err){
                    console.log("Task deleted successfully!");
                    writeSuccess = true;
                }
            });
            let myHtmlEnd = `
                <p> Removed task ${deleteId} </p>
                </body>
                </html>
            `;
            response.write(myHtml+myHtmlEnd);
        }
        else{
            let myHtmlEnd = `
                <p>  Task ${deleteId} not found </p>
                </body>
                </html>
            `;
            response.write(myHtml+myHtmlEnd);
        }
    } 
  
    else if (pathname == "/displayTasks") {
        let myTasks = [];
        if(fs.readFileSync(tasksFileName) != ""){
            myTasks = JSON.parse(fs.readFileSync(tasksFileName))
        }
        let myHtmlEnd = `
            <table border="1">
            <thead>
                <tr>
                <th>Employee Id</th>
                <th>Task Id</th>
                <th>Task</th>
                <th>Deadline</th>
                </tr>
            </thead>
            <tbody>
        `
        myTasks.forEach(task => {
            myHtmlEnd += `
            <tr>
            <td>${task.empId}</td>
            <td>${task.taskId}</td>
            <td>${task.task}</td>
            <td>${task.deadline}</td>
            </tr>
            `
        })
        myHtmlEnd += `
            </tbody>
            </table>
            </body>
            </html>
        `;
        response.write(myHtml+myHtmlEnd);
    }
    
    response.end();
  });


server.listen(9090,()=>console.log("Server running on port number 9090"))