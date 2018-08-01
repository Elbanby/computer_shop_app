var n = 1;
var k = 0;

$(document).ready(() => {
  let invoiceObject;

  $.ajax({
    type: "GET",
    url: "./JSON/invoice.json",
    dataType: "json",
    success: parseInvoice
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


  $.ajax({
    type: "GET",
    url: "./JSON/customers.json",
    dataType: "json",
    success: parseCutomers
  });

  function parseCutomers(JsonObj) {
    //Number of customers included in the JSON file
    let numCustomers = JsonObj.customer.length;
    //Customer is an array of of cusotmers
    let customer = JsonObj.customer;

    for (let i = 0; i < numCustomers; i++) {
      let id = customer[i].compId;

      $("#customerHNav").append("<section class='list ui-btn ui-icon-arrow-r ui-btn-icon-right ui-shadow' id='p" + n + "'" + '<div>' + customer[i].comptName + '</div>' + "</section><br />");


      $("#customerHNav").append("<article id='d" + n + "'>" + "<p>work on the parsing later</p>" + "</article><br />");
      //Get invoice Id
      //For each invoice Id, search invoice.json for the equiviliant id and print it out
      $("#d" + n).append("<p class='customer_info'>Customer Name: &nbsp;" + customer[i].comptName + "<br>Company Id:  &nbsp;" + customer[i].compId + "<br>Company Contact: &nbsp; " + customer[i].compContact + "<br>CompanyPhone:  &nbsp;" + customer[i].compPhone + "</p>");
      $("#d" + n).append("<div style='color:white;'>Invoices for " + customer[i].comptName + "</div>");
      $("#d" + n).append("<section class='list ui-btn ui-icon-arrow-r ui-btn-icon-right ui-shadow>'<div> Emial</div> </section>");
      $("#d" + n).append("<section class='list ui-btn ui-icon-arrow-r ui-btn-icon-right ui-shadow>'<div>map </div> </section>");


      for (let j = 0; j < customer[i].invoice.length; j++) {
        let inv = customer[i].invoice[j];

        //Do something to get the relative Id for the invoice
        let invObj = findInvoice(customer[i].invoice[j]); //Here we assumed we are doing a synchronous way, we should use a method to insure that this is done only once the file is parsed

        /*>>>>>@ANAN
            Please add a sub page when A user click on the invoice buttons.
            Also if we could fix the design for displaying the comapany name, etc..
            that would be great.

          This is where we make the sub buttons-- Please edit there design*/
        $("#d" + n).append("<section class='list ui-btn ui-icon-arrow-r ui-btn-icon-right ui-shadow' id='inv" + k + "'>" + "<div>Invoice " + j + " id: " + invObj.invNumber + '</div>' + "</section><br />");
        k++;

      //>>>>>@Anna Please add your code here



      }

      $("#d" + n).hide(); // hide the content div
      checkDisplay(n); // check to see if the company section is clicked
      n++;
    }
  }

  $.ajax({
    type: "GET",
    url: "./JSON/product.json",
    dataType: "json",
    success: parseProducts
  });

  function parseProducts(JsonObj) {
    let products = JsonObj.product;

    for (let i = 0; i < products.length; i++) {

      $("#productHNav").append("<section class='list ui-btn ui-icon-arrow-r ui-btn-icon-right ui-shadow' id='p" + n + "'" + '<div>ID: ' + products[i].prodId + ': </div>' + products[i].prodDiscr + ' (' + products[i].prodAmt + ')' + "</section><br />");

      //PLEASE WORK ON PARSING HERE
      //PLEASE WORK ON PARSING HERE
      //PLEASE WORK ON PARSING HERE
      // create a list of invoices/content under each product
      $("#productHNav").append("<article id='d" + n + "'>" + "<p>work on the parsing later</p>" + "</article><br />");

      $("#d" + n).hide(); // hide the content div
      checkDisplay(n); // check to see if the product section is clicked
      n++;
    }
  }

}); //Document ready end

function checkDisplay(n) {
  $("#p" + n).click(function() { // which product name section is clicked
    $("article:not([id$='" + n + "'])").hide("slow"); // hide all that do not end in clicked section ($=)
    $("#d" + n).toggle("fast"); // toggle (show/hide) content div
  });
}
