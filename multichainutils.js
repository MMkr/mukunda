const multichain = require("./multichain");

let getInfo = function() {
    return new Promise((resolve, reject)=>{
      multichain.getInfo((err, info) => {
            if(err){
                return reject(err);
            } 
         return resolve(info);
        });
    });    
}
// let getNewAddress = function() {
//     return new Promise((resolve, reject)=>{
//       multichain.getNewAddress((err, info) => {
//             if(err){
//                 return reject(err);
//             } 
//          return resolve(info);
//         });
//     });    
// }

let getNewAddress = function() {
    return  new Promise((resolve, reject)=>{
        multichain.getNewAddress((err, info)=>{
            if(err) {
                return reject(err)
            } else {
                return resolve(info);
            } 
        });
    });
}


let create = function(name) {
    return new Promise((resolve, reject)=>{
      multichain.create({type: "stream", name: name, open: true}, (err, tx) => {
            if(err){
                return reject(err);
            } 
         return resolve(tx);
        });
    });    
}
let subscribe = function(streamName) {
    return new Promise((resolve, reject)=>{
      multichain.subscribe({stream: streamName }, (err, tx) => {
            if(err){
                return reject(err);
            } 
         return resolve(tx);
        });
    });    
}
let publishStream = function(streamName, key, data) {
    return new Promise((resolve, reject)=>{
      multichain.publish({stream: streamName, key: key, data:data }, (err, tx) => {
            if(err){
                return reject(err);
            } 
         return resolve(tx);
        });
    });    
}
//issueFrom: ["from", "to", "asset", "qty", {"units": 1}, {"native-amount": 0}, {"details": {}}]
let issueFrom = function(to, asset, qty) {
    return new Promise((resolve, reject)=>{
      multichain.issueFrom({from: "1LQqzguri9Gkfk8FnwJpifr1nEtkymuqqCmqNB", to: to, asset:asset, qty:qty }, (err, tx) => {
            if(err){
                return reject(err);
            } 
         return resolve(tx);
        });
    });    
}
//only send and receive
let grant = function(address) {
    return new Promise((resolve, reject)=>{
      multichain.grant({addresses: address, permissions:  "send,receive" }, (err, tx) => {
            if(err){
                return reject(err);
            } 
         return resolve(tx);
        });
    });    
}
let fetchStreamdata = function(streamName, keyName) {
    return new Promise((resolve, reject)=>{
      multichain.listStreamKeyItems({stream: streamName, key:  keyName, verbose: false, count:1 }, (err, data) => {
            if(err){
                return reject(err);
            } 
         return resolve(data);
        });
    });    
}
let fetchStreamdataMultiple = function(streamName, keyName) {
    return new Promise((resolve, reject)=>{
      multichain.listStreamKeyItems({stream: streamName, key:  keyName, verbose: false, count:1000 }, (err, data) => {
            if(err){
                return reject(err);
            } 
         return resolve(data);
        });
    });    
}
let fetchStreams = function() {
    return new Promise((resolve, reject)=>{
      multichain.listStreams((err, data) => {
            if(err){
                return reject(err);
            } 
         return resolve(data);
        });
    });    
}
let fetchStreamkeys = function(streamName) {
    return new Promise((resolve, reject)=>{
      multichain.listStreamKeys({stream: streamName}, (err, data) => {
            if(err){
                return reject(err);
            } 
         return resolve(data);
        });
    });    
}

let getAddressBalances = function(address) {
    return new Promise((resolve, reject)=>{
      multichain.getAddressBalances({address: address, minconf: 0}, (err, data) => {
            if(err){
                return reject(err);
            } 
         return resolve(data);
        });
    });    
}
let sendFromAddress = function(fromaddress, toaddress, asset) {
    return new Promise((resolve, reject)=>{
      multichain.sendFromAddress({from: fromaddress, to: toaddress, amount:{
          [asset]: 1
      }}, (err, data) => {
            if(err){
                return reject(err);
            } 
         return resolve(data);
        });
    });    
}
let listAssetTransactions = function(asset) {
    return new Promise((resolve, reject)=>{
      multichain.listAssetTransactions({asset: asset, verbose: true}, (err, data) => {
            if(err){
                return reject(err);
            } 
         return resolve(data);
        });
    });    
}
let listAssets = function() {
    return new Promise((resolve, reject)=>{
      multichain.listAssets( (err, data) => {
            if(err){
                return reject(err);
            } 
         return resolve(data);
        });
    });    
}
module.exports = {
    getInfo:getInfo,
    getNewAddress: getNewAddress,
    create: create,
    subscribe: subscribe,
    publishStream: publishStream,
    issueFrom: issueFrom,
    grant: grant,
    fetchStreamdata: fetchStreamdata,
    fetchStreams: fetchStreams,
    fetchStreamkeys: fetchStreamkeys,
    getAddressBalances: getAddressBalances,
    sendFromAddress: sendFromAddress,
    fetchStreamdataMultiple: fetchStreamdataMultiple,
    listAssetTransactions: listAssetTransactions,
    listAssets: listAssets
}