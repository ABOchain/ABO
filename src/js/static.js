var config = require("../../config.js");

module.exports = {
    GETH_SERVER_ADDRESS : "https://" + config.GETH.SERVER_ADDRESS + ":" + config.GETH.SERVER_PORT,
    ORIGIN_ADDR : config.GETH.ORIGIN_ADDR,
    ORIGIN_ADDR_PASS : config.GETH.ORIGIN_ADDR_PASS,
    SECRET_KEY : config.JWT.SECRET_KEY,
    HTTP_PORT : config.HTTP.PORT,
    HTTP_OK : 200,
    HTTP_ERROR : 503
}