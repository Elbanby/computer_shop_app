var n = 1;
var k = 0;
var a = 1;

$(document).ready(() => {
  let g_invoiceObject;
  let g_productObj;

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
  g_invoiceObject = invObj;
}

function findInvoice(invNum) {
  //Here we are using a binary search, which could get extremly slow if data grow largely
  for (let i = 0; i < g_invoiceObject.invoice.length; i++) {
    if (g_invoiceObject.invoice[i].invNumber == invNum) {
      return g_invoiceObject.invoice[i];
    }
  }
}

function findProduct(prodId) {
  //Here we are using a binary search, which could get extremly slow if data grow largely
  for (let i = 0; i < g_productObj.product.length; i++) {
    if (g_productObj.product[i].prodId == prodId) {
      return g_productObj.product[i];
    }
  }
  return productObj
}

function parseCutomers(JsonObj) {
  //Number of customers included in the JSON file
  let numCustomers = JsonObj.customer.length;
  //Customer is an array of of cusotmers
  let customer = JsonObj.customer;

  for (let i = 0; i < numCustomers; i++) {
    let id = customer[i].compId;

    $("#customerHNav").append("<section class='list ui-btn ui-icon-arrow-r ui-btn-icon-right ui-shadow' id='p" + n + "'" + '<div>' + customer[i].comptName + '</div>' + "</section><br />");

    $("#customerHNav").append("<article id='d" + n + "'>" + "<p>Customer information: </p>" + "</article><br />");
    //Get invoice Id
    //For each invoice Id, search invoice.json for the equiviliant id and print it out
    $("#d" + n).append("<p class='customer_info'>Customer Name: &nbsp;" + customer[i].comptName + "<br>Company Id:  &nbsp;" + customer[i].compId + "<br>Company Contact: &nbsp; " + customer[i].compContact + "<br>CompanyPhone:  &nbsp;" + customer[i].compPhone + "</p>");
    $("#d" + n).append("<section class='ui-btn ui-icon-plus ui-btn-icon-left ui-btn-inline ui-corner-all'> <div> <a style='text-decoration: none; color: white;' href='mailto:" + customer[i].compEmail + "'>Email</a> </div></section>");
    $("#d" + n).append("<section class='ui-btn ui-icon-plus ui-btn-icon-left ui-btn-inline ui-corner-all>'<div><a style='text-decoration: none; color: white;' href='./mapPage.html' data-transition='flip'>map</a> </div> </section>");

    $("#d" + n).append("<div>Invoices for " + customer[i].comptName + "</div>");

    for (let j = 0; j < customer[i].invoice.length; j++) {
      let inv = customer[i].invoice[j];

      //Do something to get the relative Id for the invoice
      let invObj = findInvoice(customer[i].invoice[j]); //Here we assumed we are doing a synchronous way, we should use a method to insure that this is done only once the file is parsed

      $("#d" + n).append("<section class='popup ui-btn ui-icon-plus ui-btn-icon-left ui-btn-inline ui-corner-all' id='inv" + k + "'>" + "<div style='color:white'>Invoice " + invObj.invNumber + '</div>' + "</section><br />").css({"background-color": "grey", "text-align": "center", "margin": "auto"}).width('600px');

      k++;

      // <span id='invoice2' style='visibility:hidden'> invoice info..... </span>
      $("#d" + n).append("<div id='invoice'> Invoices date: " + invObj.invDate + "<br>Invoice amount: " + invObj.invAmt + "<br>");

      for (let j = 0; j < invObj.product.length; j++) {
        let prod = findProduct(invObj.product[j].prodId);
        $("#d" + n).append(prod.prodDiscr + "    " + prod.prodAmt + "<br>");
      }
      $("#d" + n).append("</div>");
      //
      $("#invoice" + n).hide(); // hide the content div
      // checkDisplayForInvoice(a);  check to see if the company section is clicked
      // a++;

    }

    $("#d" + n).hide(); // hide the content div
    checkDisplay(n); // check to see if the company section is clicked
    n++;
  }
}

function parseProducts(JsonObj) {

  g_productObj = JsonObj;
  let products = JsonObj.product;

  for (let i = 0; i < products.length; i++) {

    $("#productHNav").append("<section class='list ui-btn ui-icon-arrow-r ui-btn-icon-right ui-shadow' id='p" + n + "'" + '<div>ID: ' + products[i].prodId + ': </div>' + products[i].prodDiscr + ' (' + products[i].prodAmt + ')' + "</section><br />");

    // create a list of invoices/content under each product
    //  $("#productHNav").append("<section id='d" + n + "'> <img src='../"+ products[i].img + "'></section><br />");

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
