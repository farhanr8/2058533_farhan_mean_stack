const fs = require("fs");
let obj = require("readline");
var r1 = obj.createInterface({
    input:process.stdin,        // standard input device keyboards 
    output:process.stdout       // standard output device console 
});

// Read file
const recordsFilename = "records.json";
let records = [];
if(fs.readFileSync(recordsFilename) != ""){
	records = JSON.parse(fs.readFileSync(recordsFilename))
}
debugger;

// Get user input
r1.question("Enter first name: ",(fInput)=> {
    r1.question("Enter last name: ",(lInput)=> {
        r1.question("Enter gender: ",(gInput)=> {
			r1.question("Enter email: ",(eInput)=> {
            	let recObj = {
					firstName: fInput,
					lastName: lInput,
					gender: gInput,
					email: eInput,
					timestamp: Date().toLocaleString()
				};
				records.push(recObj);
				debugger;
				fs.writeFile(recordsFilename, JSON.stringify(records, null, '\t'), {flag:"w"}, err => {
					if(!err){
						console.log("Data stored successfully...")
					}
				});
				r1.close();
			})
        })
    })
})

