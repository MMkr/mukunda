let multichain = require("multichain-node")({
    port: 6468,
    host: '127.0.0.1',
    user: "multichainrpc",
    pass: "DyJm1SRztnVMpDWQ6S3bDHiK2Qb9nnNPyFuiBpc2ZU3i"
});

module.exports = multichain;