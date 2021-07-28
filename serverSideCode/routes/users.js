var express = require("express");
var router = express.Router();
const env = require("dotenv").config();
var braintree = require("braintree");


const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "6ckmgfdrh8jhrkb4",
  publicKey: "t68xfnpfnc24wc4b",
  privateKey: "208a47f672ee3a53b0d100e36d8273f4"
});


let verifcationID = '';
let volttoken = ''
let voltnance = ''

//generating token 
//http://localhost:3000/users/initializeBraintree {GET} 
router.get('/initializeBraintree', async (req, res) => {
  try {
    let token = (await gateway.clientToken.generate({})).clientToken;
    res.json({ data: token });
  }
  catch (err) {
    res.json({ status: "operation failed" })
  }
});

let amount = '';
let info;
//proccessing tranasction to pay
//http://localhost:3000/users/confirmBraintree  {POST}
router.post('/confirmBraintree', (req, res) => {
  const nonceFromTheClient = req.body.noncetoken
  info = req.body
  amount = parseFloat(req.body.userdetail.amount);
  console.log("check nonce", req.body.userdetail)

  gateway.customer.create({
    firstName: req.body.userdetail.firstName,
    lastName: req.body.userdetail.lastName,

  },
    (err, result) => {
      if (result.success) {
        console.log("to the the customer id", result)
        gateway.paymentMethod.create({
          customerId: result.customer.id,
          paymentMethodNonce: nonceFromTheClient,
          options: {
            usBankAccountVerificationMethod:
              braintree.UsBankAccountVerification.VerificationMethod.MicroTransfers   // or MicroTransfers or IndependentCheck
          }
        }, (err, result) => {
          console.log(result)
          if (result.success) {
            const usBankAccount = result.paymentMethod;
            const verified = usBankAccount.verified;
            const responseCode = usBankAccount.verifications[0].processorResponseCode;
            console.log("usbank============>", usBankAccount)
            console.log("verifeid============>", verified)
            console.log("resoncecode=======>", responseCode)

            verifcationID = result.usBankAccount.verifications[0].id;
            volttoken = result.usBankAccount.token
            res.json({
              status: "success then do micro transfer checking",
              id: result.usBankAccount.verifications[0].id
            })

          } else {
            res.json({ status: "ERR", err })

          }
        });
      }
    });
});


router.post('/transferbalance', (req, res) => {
  console.log("id from body", req.body, "id from vairable", verifcationID, "amount", amount)
  // res.json({status:"good to go",id:verifcationID})
  //x is first micro transfer amount
  let x = parseFloat(req.body.firstBalance)
  //y Second Micro transfer amount
  let y = parseFloat(req.body.secondBalance)

  gateway.usBankAccountVerification.confirmMicroTransferAmounts(
    verifcationID, [x, y],
    (err, response) => {
      if (response.success) {
        console.log("verifaction ID" + response.usBankAccountVerification.id)
        gateway.usBankAccountVerification.find(response.usBankAccountVerification.id,
          (err, verification) => {
            const status = verification.status;

            if (status == "verified") {
              // ready for transacting
              gateway.transaction.sale({
                amount: amount,
                paymentMethodToken: volttoken,
                options: {
                  submitForSettlement: true
                }
              }, (err, result) => {
                if (result.success) {
                  // See result.transaction for details
                  res.json({ status: "success", result })

                } else {
                  // Handle errors
                  res.json({ status: "failed", result })

                }
              });

            } else if (status == "pending") {
              // continue waiting
              res.json({
                status: "pending",
              })
            } else {
              // verification failed
              res.json({
                status: "verifaction failed"
              })
            }
          });


      }
      else {
        res.json({
          status: "micro transfer failed",
          response: err

        })
      }

    });
})


router.post('/webhookurl', (req, res) => {
  console.log("test", req.body);
  gateway.webhookNotification.parse(
    req.body.bt_signature,
    req.body.bt_payload,
    (err, webhookNotification) => {
      console.log("[Webhook Received " +
        webhookNotification.timestamp + "] | Kind: " +
        webhookNotification.kind);

      // Example values for webhook notification properties
      console.log(webhookNotification.kind); // "subscriptionWentPastDue"
      console.log(webhookNotification.timestamp); // Sun Jan 1 00:00:00 UTC 2012
      res.status(200).send();
    });
})


router.get('/receipt', (req, res) => {

  res.json({ data: info, tranacatioID: verifcationID, })
})
module.exports = router;
