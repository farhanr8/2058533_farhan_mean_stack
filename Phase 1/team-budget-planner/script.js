/********* Program Manager Functions *********/

function submit_form() {
    var data = read_form_data()
    store_data(data)
    clear_form()
}

function read_form_data() {
    var obj = {}    

    obj.client_name = document.getElementById("client_name").value
    obj.project_name = document.getElementById("project_name").value
    obj.budget = document.getElementById("budget").value

    console.log(obj)
    return obj
}

function store_data(data) {
    if (sessionStorage.getItem("sessionData") == null) {
        sessionStorage.setItem("sessionData", "[]")
    }
    myList = JSON.parse(sessionStorage.getItem("sessionData"))
    myList.push(data)
    sessionStorage.setItem("sessionData", JSON.stringify(myList))
}

function clear_form() {
    document.getElementById("myForm").reset()
}


/********* Finance Team Functions *********/

function show_records() {
    session_data = JSON.parse(sessionStorage.getItem('sessionData'))
    if (session_data != null) {
        session_data.forEach(data => insert_row(data));
    }
}

function insert_row(data){
    document.write(
        `
        <tr>
            <td>${data.client_name}</td>
            <td>${data.project_name}</td>
            <td>$${data.budget}</td>
        </tr>
        `
    )
}

function show_total() {
    totalObj = {client_name:"<b>Total<b>", project_name: "", budget: 0}

    session_total_data = JSON.parse(sessionStorage.getItem('budgetTotalData'))
    if (session_total_data == null) {
        sessionStorage.setItem('budgetTotalData', JSON.stringify([totalObj]))
    }

    session_data = JSON.parse(sessionStorage.getItem('sessionData'))
    if (session_data != null) {
        session_data.forEach( data => totalObj.budget += parseInt(data.budget));
    }
    
    insert_row(totalObj)
}