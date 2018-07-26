
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
      //productHNav
      $('#productHNav').append( '<div id="prod_' + products[i].prodId + '">' + '<a href="#custInfo_'+ products[i].prodId +
       '" class="ui-btn ui-icon-arrow-r ui-btn-icon-right ui-shadow">' +
         products[i].prodDiscr + ' ('+ products[i].prodAmt +')' +'</a></div>');

    }
  }

});//Document ready end
