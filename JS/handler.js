var n = 1;
var k = 0;
var a = 1;

$(document).ready(() => {
  let invoiceObject;

  $.ajax({
    type: "GET",
    url: "./JSON/invoice.json",
    dataType: "json",
    success: parseInvoice
  });

  $.ajax({
    type: "GET",
    url: "./JSON/products.json",
    dataType: "json",
    success:parseProducts,
    error: function(err) {
      console.log(err);
    }
  });

  $.ajax({
    type: "GET",
    url: "./JSON/customers.json",
    dataType: "json",
    success: parseCutomers
  });



  function parseInvoice(invObj) {
    invoiceObject = invObj;
  }

  function findInvoice(invNum) {
    //Here we are using a binary search, which could get extremly slow if data grow
    for (let i = 0; i < invoiceObject.invoice.length; i++) {
      if (invoiceObject.invoice[i].invNumber == invNum) {
        return invoiceObject.invoice[i];
      }
    }
  }



  function parseCutomers(JsonObj) {
    //Number of customers included in the JSON file
    let numCustomers = JsonObj.customer.length;
    //Customer is an array of of cusotmers
    let customer = JsonObj.customer;

    for (let i = 0; i < numCustomers; i++) {
      let id = customer[i].compId;

      $("#customerHNav").append("<section class='list ui-btn ui-icon-arrow-r ui-btn-icon-right ui-shadow' id='p" +
       n + "'" + '<div>' + customer[i].comptName + '</div>' + "</section><br />");


      $("#customerHNav").append("<article id='d" + n + "'>" + "<p>Customer information: </p>" + "</article><br />");
      //Get invoice Id
      //For each invoice Id, search invoice.json for the equiviliant id and print it out
      $("#d" + n).append("<p class='customer_info'>Customer Name: &nbsp;" + customer[i].comptName +
            "<br>Company Id:  &nbsp;" + customer[i].compId + "<br>Company Contact: &nbsp; " +
            customer[i].compContact + "<br>CompanyPhone:  &nbsp;" + customer[i].compPhone + "</p>");
      $("#d" + n).append("<section class='ui-btn ui-icon-plus ui-btn-icon-left ui-btn-inline ui-corner-all'> <div> <a style='text-decoration: none;' href='mailto:" + customer[i].compEmail + "'>Email</a> </div></section>");
      $("#d" + n).append("<section class='ui-btn ui-icon-plus ui-btn-icon-left ui-btn-inline ui-corner-all>'<div> map </div> </section>");


      $("#d" + n).append("<div>Invoices for " + customer[i].comptName + "</div>");


      for (let j = 0; j < customer[i].invoice.length; j++) {
        let inv = customer[i].invoice[j];

        //Do something to get the relative Id for the invoice
        let invObj = findInvoice(customer[i].invoice[j]); //Here we assumed we are doing a synchronous way, we should use a method to insure that this is done only once the file is parsed

        $("#d" + n).append("<section onclick='myFunction()' class='popup ui-btn ui-icon-plus ui-btn-icon-left ui-btn-inline ui-corner-all' id='inv" + k + "'>"
        + "<div style='color:white'>Invoice " + invObj.invNumber + '</div>' +
        "</section><br />").css({"background-color":"grey", "text-align":"center"}).width('600px');
        k++;

        // <span id='invoice2' style='visibility:hidden'> invoice info..... </span>

        $("#d" + n ).append("<div id='invoice'> invoice info..... </div>");
        //
        $("#invoice" + n).hide(); // hide the content div
        // checkDisplayForInvoice(a); // check to see if the company section is clicked
        // a++;

      }

      $("#d" + n).hide(); // hide the content div
      checkDisplay(n); // check to see if the company section is clicked
      n++;
    }
  }

  function parseProducts(JsonObj) {
    console.log(JsonObj);

    let products = JsonObj.product;

    for (let i = 0; i < products.length; i++) {

      $("#productHNav").append("<section class='list ui-btn ui-icon-arrow-r ui-btn-icon-right ui-shadow' id='p" + n + "'" + '<div>ID: ' + products[i].prodId + ': </div>' + products[i].prodDiscr + ' (' + products[i].prodAmt + ')' + "</section><br />");

      // create a list of invoices/content under each product
      $("#productHNav").append("<article id='d" + n + "'>" + "<p>work on the parsing later</p>" + "</article><br />");

      $("#d" + n).hide(); // hide the content div
      checkDisplay(n); // check to see if the product section is clicked
      n++;
    }
  }

}); //Document ready end

//ADD INVOICE INFO HERE
function myFunction() {

  alert("here");
  // var popup = document.getElementById("invoice");
  // popup.classList.toggle("show");
}


function checkDisplay(n) {
  $("#p" + n).click(function() { // which product name section is clicked
    $("article:not([id$='" + n + "'])").hide("slow"); // hide all that do not end in clicked section ($=)
    $("#d" + n).toggle("fast"); // toggle (show/hide) content div
  });
}
