# ESP8266 HTTP Client

A simple Kaluma HTTP client library for ESP8266 module.  It includes minimum code just to send a HTTP request using AT command.

Tested firmware versions:

| Module | Manufacturer | AT version | SDK version |
| ------ | ------------ | ---------- | ----------- |
| ESP-01 | Ai-Thinker Technology Co. Ltd. | 1.2.0.0 | 1.5.4.1 |

# Wiring

Here is a wiring example for `UART0`.

| Raspberry Pi Pico | ESP8266    | 
| ----------------- | ---------- |
| 3V3               | VCC, CH_PD |
| GND               | GND        |
| GP0 (UART0 TX)    | RXD        |
| GP1 (UART0 RX)    | TXD        |

![wiring](https://github.com/niklauslee/esp8266-http-client/blob/main/images/wiring.jpg?raw=true)

# Install

```sh
npm install https://github.com/niklauslee/esp8266-http-client
```

# Usage

```js
const {ESP8266HTTPClient} = require('esp8266-http-client');
const esp = new ESP8266HTTPClient(null, {debug: true});

esp.wifi()
  .then(() => {
    esp.http('http://your-server.com')
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  })
  .catch(err => {
    console.log(err);
  });
```

Or, you can use async function.

```js
async function main() {
  try {
    await esp.wifi();
    const res = await esp.http('http://your-server.com');
  } catch (err) {
    console.log(err);
  }
}

main();
```

# API

## Class: ESP8266HTTPClient

### new ESP8266HTTPClient([serial[, options]])

- `serial` `<UART>` UART object connected to ESP8266 module. Default: `board.uart(0)`.
- `options` `<object>` Options for [ATCommand](https://docs.kaluma.io/api-reference/at-command).

### esp.wifi([connect])

- `connect` `<object>` Wi-Fi connection info.
  - `ssid` `<string>`
  - `password` `<string>`
- Return: `<Promise<>>`

Connect to Wi-Fi network.

```js
esp.wifi({ssid:'MyHome', password:'12345678'})
  .then(() => {
    console.log('connected');
  })
  .catch(err => {
    console.error(err);
  });
```

If you do not want to expose your Wi-Fi connection info, you can set them in the storage. Add connection info manually in Terminal as below:

```
> storage.setItem('WIFI_SSID', 'MyHome');
> storage.setItem('WIFI_PASSWORD', '12345678');
```

If you have `WIFI_SSID` and `WIFI_PASSWORD` items in storage, then you can connect without connection info.

```js
esp.wifi()
  .then(() => {
    console.log('connected');
  })
  .catch(err => {
    console.error(err);
  });
```

### esp.http(url[, options])

- `url` `<string>` URL.
- `options` `<object>`
  - `method` `<string>` HTTP method.
  - `headers` `<object>` HTTP headers.
  - `body` `<string>` HTTP body.
  - `timeout` `<number>`. Maximum waiting time for HTTP response. Default: `10000` (10 sec).
- Returns: `<Promise<object>>` Response object.
  - `status` `<number>` HTTP status code.
  - `statusText` `<string>` HTTP status text.
  - `headers` `<object>` HTTP response headers.
  - `body` `<string>` HTTP response body.

Send a HTTP request and returns the response.
