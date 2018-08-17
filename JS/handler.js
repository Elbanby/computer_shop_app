var n = 1;
var k = 0;
var a = 1;
var customersArray = new Array();
var productsArray = new Array();

$(document).ready(() => {
  let g_invoiceObject;
  let g_productObj;

  $.ajax({type: "GET", url: "./JSON/invoice.json", dataType: "json", success: parseInvoice});

  $.ajax({
    type: "GET",
    url: "./JSON/products.json",
    dataType: "json",
    success: parseProducts,
    error: function(err) {
      console.log(err);
    }
  });

  $.ajax({type: "GET", url: "./JSON/customers.json", dataType: "json", success: parseCutomers});

  function parseInvoice(invObj) {
    g_invoiceObject = invObj;
  }

  function findInvoice(invNum) {
    //Here we are using a linear search, which could get extremly slow if data grow largely O(n)
    for (let i = 0; i < g_invoiceObject.invoice.length; i++) {
      if (g_invoiceObject.invoice[i].invNumber == invNum) {
        return g_invoiceObject.invoice[i];
      }
    }
  }

  function findProduct(prodId) {
    //Here we are using a linear search, which could get extremly slow if data grow largely O(n)
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
      //Add customer name to customer array
      customersArray[n] = customer[i].comptName.toUpperCase();
      $("#customerHNav").append("<section class='list ui-btn ui-icon-arrow-r ui-btn-icon-right ui-shadow' id='p" + n + "'" + '<div>' + customer[i].comptName + '</div>' + "</section><br />");

      $("#customerHNav").append("<article id='d" + n + "'>" + "<p>Customer information: </p>" + "</article><br />");
      //Get invoice Id
      //For each invoice Id, search invoice.json for the equiviliant id and print it out
      $("#d" + n).append("<p class='customer_info'>Customer Name: &nbsp;" + customer[i].comptName + "<br>Company Id:  &nbsp;" + customer[i].compId + "<br>Company Contact: &nbsp; " + customer[i].compContact + "<br>CompanyPhone:  &nbsp;" + customer[i].compPhone + "</p>");
      $("#d" + n).append("<section class='ui-btn ui-icon-plus ui-btn-icon-left ui-btn-inline ui-corner-all'> <div> <a style='text-decoration: none; color: white;' href='mailto:" + customer[i].compEmail + "'>Email</a> </div></section>");
      $("#d" + n).append('<section class="ui-btn ui-icon-plus ui-btn-icon-left ui-btn-inline ui-corner-all" <div> <a style="text-decoration: none; color: white;"  data-transition="flip" id="map' + n + '"> Map </a> </div> </section>');

      $("#map" + n).click(function() {
        sessionStorage.location = customer[i].compAddress;
        console.log(sessionStorage);
        window.location.href = "./mapPage.html";
      });

      $("#d" + n).append("<div>Invoices for " + customer[i].comptName + "</div>");

      for (let j = 0; j < customer[i].invoice.length; j++) {
        let inv = customer[i].invoice[j];

        //Here we assumed we are doing a synchronous way, we should use a method to insure that this is done only once the file is parsed
        let invObj = findInvoice(customer[i].invoice[j]);

        $("#d" + n).append("<section class='popup ui-btn ui-btn-inline ui-corner-all' id='inv" + k + "'>" + "<div style='color:white'>Invoice " + invObj.invNumber + '</div>' + "</section><br />").css({"background-color": "grey", "text-align": "center", "margin": "auto"}).width('600px');

        k++;

        $("#d" + n).append("<div id='invoice'> Invoices date: " + invObj.invDate + "<br>Invoice amount: " + invObj.invAmt + "<br>");

        for (let j = 0; j < invObj.product.length; j++) {
          let prod = findProduct(invObj.product[j].prodId);
          $("#d" + n).append(prod.prodDiscr + "    " + prod.prodAmt + "<br>");
        }
        $("#d" + n).append("</div>");

        // hide the content div
        $("#invoice" + n).hide();
      }
      // hide the content div
      $("#d" + n).hide();
      // check to see if the company section is clicked
      checkDisplay(n);
      n++;
    }
  }

  function parseProducts(JsonObj) {
    g_productObj = JsonObj;
    let products = JsonObj.product;

    for (let i = 0; i < products.length; i++) {
      productsArray[n] = products[i].prodDiscr.toUpperCase();
      $("#productHNav").append("<section class='list ui-btn ui-icon-arrow-r ui-btn-icon-right ui-shadow' id='p" + n + "'" + '<div>ID: ' + products[i].prodId + ': </div>' + products[i].prodDiscr + ' (' + products[i].prodAmt + ')' + "</section><br />");
      $("#productHNav").append("<section id='d" + n + "'><div> Product description:&nbsp;" + products[i].prodDiscr + "<br>Product id:&nbsp;" + products[i].prodId + "<br>Price:&nbsp;" + products[i].prodAmt + "</div> <img src='./" + products[i].img + "'></section><br />").css("text-align", "center");
      // hide the content div
      $("#d" + n).hide();
      // check to see if the product section is clicked
      checkDisplay(n);
      n++;
    }
  }
  //Document ready end
});

function checkDisplay(n) {
  // which product name section is clicked
  $("#p" + n).click(function() {
    // hide all that do not end in clicked section ($=)
    $("article:not([id$='" + n + "'])").hide("slow");
    // toggle (show/hide) content div
    $("#d" + n).toggle("fast");
  });
}

function search(e) {
  let index = 0;
  console.log("hsda");
  if (e.target.id === "searchProduct") {
    if (e.keyCode == 13) {
      let query = document.getElementById("searchProduct").value.toUpperCase();
      index = productsArray.indexOf(query);
    }
  } else {
    if (e.keyCode == 13) {
      let query = document.getElementById("searchCustomer").value.toUpperCase();
      index = customersArray.indexOf(query);
    }
  }
  if (index != -1) {
    $("#d" + index).toggle();
  }
}
