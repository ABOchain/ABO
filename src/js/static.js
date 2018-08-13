var Config = require("./config.js");

module.exports = {
    GETH_SERVER_ADDRESS : "http://" + Config.geth.server_ip + ":" + Config.geth.server_port,
    ORIGIN_ADDR : Config.geth.origin_addr,
    ORIGIN_ADDR_PASS : Config.geth.origin_addr_pass,
    SECRET_KEY : Config.jwt.secret_key,
    HTTP_PORT : Config.http.port,
    HTTP_OK : 200,
    HTTP_ERROR : 503
}