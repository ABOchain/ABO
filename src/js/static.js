var Config = require("config");

module.exports = {
    GETH_SERVER_ADDRESS : "http://" + Config.get("geth").server_ip + ":" + Config.get("geth").server_port,
    ORIGIN_ADDR : Config.get("geth").origin_addr,
    ORIGIN_ADDR_PASS : Config.get("geth").origin_addr_pass,
    SECRET_KEY : Config.get("jwt").secret_key,
    HTTP_PORT : Config.get("http").port,
    HTTP_OK : 200,
    HTTP_ERROR : 503
}