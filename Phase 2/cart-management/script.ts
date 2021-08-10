function addProduct(name:string,price:string):void {
	if (sessionStorage.getItem("sessionData") == null) {
        sessionStorage.setItem("sessionData", "[]")
    }
    let myCart = JSON.parse(sessionStorage.getItem("sessionData"))
    myCart.push({name:name,price:price})
    sessionStorage.setItem("sessionData", JSON.stringify(myCart))

    console.log(myCart)
    updateCartSize()
}
function updateCartSize():void {
	if (sessionStorage.getItem("sessionData") == null) {
    	document.getElementById('lblCartCount').innerHTML = "0"
    }
    else{
	    let myCart = JSON.parse(sessionStorage.getItem("sessionData"))
	    document.getElementById('lblCartCount').innerHTML = "" + myCart.length
    }
}

function showCart():void {
	if (sessionStorage.getItem("sessionData") == null) {
        sessionStorage.setItem("sessionData", "[]")
    }
    let myCart = JSON.parse(sessionStorage.getItem("sessionData"))

    let tableContent = ""
    let total = 0
    myCart.forEach(product => {
    	tableContent += "<tr><td>"+product.name+"</td><td>$ "+product.price+"</td></tr>"
    	total += parseFloat(product.price)
    })
    tableContent += "<tr><td><strong>TOTAL</strong></td><td>$ "+total+"</td></tr>"
    document.getElementById("tbody").innerHTML=tableContent

}