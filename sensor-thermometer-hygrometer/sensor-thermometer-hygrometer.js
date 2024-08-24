/**
 * 由於 J5 在 DHT 系列感測計上似乎無法正常讀取溫度和濕度，
 * 所以我另外用 C++ 寫了一個檔案，使用 Arduino IDE Upload 即可
 *
 * Ref: https://github.com/rwaldron/johnny-five/issues/1273
 *  */

/**
 * 器材準備：Arduino UNO、溫濕度感測計、I2C（若感測計是 DHT 則需要）、公對母杜邦線、LCD（選配，可以選跟 I2C 焊在一起的）
 * 實現效果：感測溫濕度並顯示在 LCD 上
 *
 * I2C: SDA 接 A4 / SCL 接 A5 / VCC 接 3V3 或 5V 皆可
 * LCD: VCC 接 5V
 *
 * Ref: Thermometer: https://johnny-five.io/api/thermometer/
 *      Hygrometer:  https://johnny-five.io/api/hygrometer/
 *      LCD:         https://johnny-five.io/api/lcd/
 *  */

import five from "johnny-five"

const board = new five.Board()

board.on("ready", function () {
  // 因為 thermometer 和 hygrometer 用同一個感測計，故使用 Multi 寫法
  const sensor = new five.Multi({
    controller: "DHT11_I2C_NANO_BACKPACK",
  })

  const lcd = new five.LCD({
    controller: "PCF8574",
  })

  sensor.on("change", function () {
    lcd.useChar("box1")
    lcd.cursor(0, 0).print(`Temp:     ${this.thermometer.celsius}:box1:C`)
    lcd.cursor(1, 0).print(`Humidity: ${this.hygrometer.relativeHumidity} %`)
  })
})
