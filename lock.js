const express = require("express");
const router = express.Router();
bodyParser = require("body-parser").json();
const multichainutils = require("../multichainutils");
const helper = require('../helpers/helper');
let multer = require('multer');
const moment = require("moment");
const fs = require('fs');
const qr = require('qr-image');

const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
var request = require('request');

var awsIot = require('aws-iot-device-sdk'); 



router.get("/", (req, res, next) => {
   invoke();
   
   async function invoke() { 
    try {

        let mcaddress = req.param('mcaddress');
        let tripID = req.param('tripID');
        const decryptedString = cryptr.decrypt(req.param('enckey'));
        
        let assetName = decryptedString;
        let riderBalances  = await multichainutils.getAddressBalances(mcaddress);
        let unlockCar = false;
        
        riderBalances.forEach(car => {
            if(car.name === assetName) {
                unlockCar = true;
            }
        });
        
        if(unlockCar) {
            let relay = "on";
            console.log("Test");
            console.log('connecting...');
            var device = awsIot.device({
                keyPath: 'certs/37c38b9e3a-private.pem.key',
                certPath: 'certs/37c38b9e3a-certificate.pem.crt',
                 caPath: 'certs/rootCA.pem',
               clientId: 'esp32-node',
                host: 'a2n96zvhdsya3b-ats.iot.ap-south-1.amazonaws.com'
             }); 
            device
            .on('connect', function() {
                console.log('connect');
                device.publish('mytopic/ESP32-MCU', relay);
            }); 
            device
            .on('message', function(topic, payload) {
                console.log('message', topic, payload.toString());
            });

            let fetchStreamData = await multichainutils.fetchStreamdata(tripID+"_S", "tripDetails")
            let streamDataRaw = await helper.hex2str(fetchStreamData[0].data); 
            let streamData = JSON.parse(streamDataRaw);
            streamData.tripStatus = "RUNNING";
            let publishStream = await multichainutils.publishStream(tripID+"_S", "tripDetails", helper.str2hex(JSON.stringify(streamData)));
            
            res.json({
                    status: "Success",
                    data: {
                        message: "Successfully Unlocked, have a safe trip",
                        
                    }
                });
        } else {
            res.json({
                status: "Fail",
                data: {
                    message: "You are unauthorised to unlock the car.",
                    
                }
              
            });
        }
        
    
    } catch (error) {
        console.log(error);
        res.json({
            status: "Fail",
            data:  error
        });
    } 
}
    
});
let testDevice = ()=>{
    return new Promise((resolve, reject)=>{
       
        return resolve("Success");
    });
}
router.get("/test", (req, res, next) => {
    invoke();
    
    async function invoke() { 
     try {
        console.log('connecting...');
        var device = awsIot.device({
            keyPath: 'certs/37c38b9e3a-private.pem.key',
            certPath: 'certs/37c38b9e3a-certificate.pem.crt',
             caPath: 'certs/rootCA.pem',
           clientId: 'esp32-node',
            host: 'a2n96zvhdsya3b-ats.iot.ap-south-1.amazonaws.com'
         }); 
        device
        .on('connect', function() {
            console.log('connect');
            device.publish('mytopic/ESP32-MCU', "on");
        }); 
        device
        .on('message', function(topic, payload) {
            console.log('message', topic, payload.toString());
        });
        res.json({
            HII: "HIII"
        })
     } catch (error) {
         console.log(error);
         res.json({
             status: "Fail",
             data:  error
         });
     } 
 }
     
 });
module.exports = router;