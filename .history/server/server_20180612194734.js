var express = require('express')
var app = express()
var path = require('path');

var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const asyncMiddleware = require('./utils/asyncMiddleware').asyncMiddleware;
const db = require('./db/item-data').asyncMiddleware;



app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(express.static(path.join(__dirname, '../server/public')));


app.use("/item", asyncMiddleware(async (req, res, next) => { 
    console.log('on server in /contact, req.body:: ', req.body);
    console.log('db::', db);
    
      
    /*
      let reqBody = req.body;
      let chargeAmount;
      let donation;
      let purchasePrice = reqBody.amount;
  
      if (reqBody.donation) {
        donation = reqBody.donation || 0;
        chargeAmount = parseFloat(reqBody.amount) + parseFloat(reqBody.donation);
      } else {
        chargeAmount = parseFloat(reqBody.amount);
      }
      console.log('chargeAmount::', chargeAmount);
        
      // Token is created using Checkout or Elements!
      // Get the payment token ID submitted by the form:
  
      // const token = reqBody.token.id; // Using Express
      let amount = chargeAmount * 100;
    
      //check DB for user by email. 
    
      let checkedCustomer;
    
      let getCheckedCustomers = async function(){
     
      }();
    
      checkedCustomer = await stripe.customers.list({
        email: reqBody.contact.email_address,
      });
    
     
      
      console.log('checkedCustomer::', checkedCustomer);
      // console.log('getCheckedCustomers::', getCheckedCustomers);
    
      let customer;
      let charge;
      if (checkedCustomer.data.length == 0 ) {
        console.log('in if');
        console.log('creating new account');
        
        //If customer email does NOT exist, then create NEW user in DB.
    
      (async function() {
        console.log('reqBody.contact.email_address::', reqBody.contact.email_address);
        
        // Create a Customer:
        customer = await stripe.customers.create({
          source: token,
          email: reqBody.contact.email_address,
        });
    
        //@Todo save customer object to user in DB
      
    
        // Charge the Customer instead of the card:
        charge = await stripe.charges.create({
          amount: amount,
          currency: 'usd',
          customer: customer.id,
          metadata: {"description": "purchase", "purchasePrice": purchasePrice, "donationAmount": donation}
        });
      
        // YOUR CODE: Save the customer ID and other info in a database for later.
        res.send({'Hello from donate, charge::': charge})
    
      })();
    
    } else if (checkedCustomer.data.length > 0 && checkedCustomer.data[0].email == reqBody.contact.email_address) {
        //Else, charge customer using their stripe id
          // Charge the Customer instead of the card:
          console.log('in else if');
          
        charge = stripe.charges.create({
          amount: amount,
          currency: 'usd',
          customer: checkedCustomer.data[0].id,
        });
        res.send({'Hello from donate, charge::': charge})
    }
    */
   res.send({'Hello from donate, charge::': 'charge'})

  
  }));
  
  app.listen(7000, function(){
      console.log("Listening on port: ", 7000);
    });
  