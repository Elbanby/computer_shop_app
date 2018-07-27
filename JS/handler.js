var n=1;

function display(customer) {
  let name = customer.comptName;
  let address = customer.compAddress;
  let companyContact = customer.compContact;
  let cmpPhone = customer.compPhone;
  let email = customer.compEmail;

  //To dispaly the invoices
  for (let i = 0 ; i < customer.invoice.length ; i++) {
      let invoice = customer.invoice[i];
      //console.log();
  }
}


$(document).ready(()=>{

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



    for (let i = 0 ; i < numCustomers ; i++) {
        let id = customer[i].compId;


           $("#customerHNav").append("<section class='list ui-btn ui-icon-arrow-r ui-btn-icon-right ui-shadow' id='p"+n+"'" +
           '<div>' + customer[i].comptName + '</div>'  + "</section><br />");

           //PLEASE WORK ON PARSING HERE
           //PLEASE WORK ON PARSING HERE
          //PLEASE WORK ON PARSING HERE
           $("#customerHNav").append("<article id='d"+n+"'>" + "<p>work on the parsing later</p>"+  "</article><br />");

           $("#d" + n).hide();			// hide the content div
           checkDisplay(n);			// check to see if the company section is clicked
           n++;


        $('#customerHNav').append( '<div id="cust_' + id + '">' + '<a href="#custInfo_'+ id +
         '" class="ui-btn ui-icon-arrow-r ui-btn-icon-right ui-shadow">' +
           customer[i].comptName + ' ('+ id +')' +'</a></div>');

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

    for (let i = 0 ; i < products.length ; i++) {


         $("#productHNav").append("<section class='list ui-btn ui-icon-arrow-r ui-btn-icon-right ui-shadow' id='p"+n+"'" +
         '<div>ID: ' + products[i].prodId + ': </div>'  +
         products[i].prodDiscr + ' ('+ products[i].prodAmt +')'+ "</section><br />");

          //PLEASE WORK ON PARSING HERE
          //PLEASE WORK ON PARSING HERE
         //PLEASE WORK ON PARSING HERE
         // create a list of invoices/content under each product
         $("#productHNav").append("<article id='d"+n+"'>" + "<p>work on the parsing later</p>"+  "</article><br />");

         $("#d" + n).hide();			// hide the content div
         checkDisplay(n);			// check to see if the product section is clicked
         n++;

      //productHNav
      $('#productHNav').append( '<div id="prod_' + products[i].prodId + '">' + '<a href="#custInfo_'+ products[i].prodId +
       '" class="ui-btn ui-icon-arrow-r ui-btn-icon-right ui-shadow">' +
         products[i].prodDiscr + ' ('+ products[i].prodAmt +')' +'</a></div>');

    }
  }



});//Document ready end

function checkDisplay(n) {
  $("#p"+n).click(function(){					// which product name section is clicked
    $("article:not([id$='"+n+"'])").hide("slow");	// hide all that do not end in clicked section ($=)
    $("#d"+n).toggle("fast");				// toggle (show/hide) content div
  });
}
