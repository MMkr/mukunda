var awsIot = require('aws-iot-device-sdk'); 
var device = awsIot.device({
   keyPath: './certs/37c38b9e3a-private.pem.key',
  certPath: './certs/37c38b9e3a-certificate.pem.crt',
    caPath: './certs/rootCA.pem',
  clientId: 'esp32-node',
   host: 'a2n96zvhdsya3b-ats.iot.ap-south-1.amazonaws.com'
});
let connection = device
  .on('connect', function() {
    console.log('connect');
    device.publish('mytopic/ESP32-MCU', "off");
  }); 
let payload = device
  .on('message', function(topic, payload) {
    console.log('message', topic, payload.toString());
});
