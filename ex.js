const { ESP8266HTTPClient } = require("./index");
const esp = new ESP8266HTTPClient(null, { debug: true });

esp
  .wifi()
  .then(() => {
    console.log("ok");
    esp
      .http("http://192.168.0.11:3000")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
  });
