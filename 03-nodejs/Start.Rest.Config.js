module.exports = {
  Rest: {
    Http: require("./Server.Rest/ServerNative"),
    Express: {
      Normal: require("./Server.Rest/ServerExpress"),
      SSL: require("./Server.Rest/ServerExpressSSL")
    }
  }
};
