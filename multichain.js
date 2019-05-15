let multichain = require("multichain-node")({
    port: 6468,
    host: '127.0.0.1',
    user: "multichainrpc",
    pass: "xxxxxxxxxxxxxxxxxxxxxxxxx"
});

module.exports = multichain;
