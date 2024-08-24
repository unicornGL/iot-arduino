/**
 * 器材準備：Arduino UNO、光敏電阻、10K 電阻、公對公杜邦線
 * 實現效果：光照強度改變電阻值
 *
 * 為避免電流過大導致 Arduino 板燒毀，故要加上一顆限流電阻
 * 光敏電阻的 pin 腳接到 Analog In
 *
 * Ref: Sensor: https://johnny-five.io/api/sensor/
 *  */

import five from "johnny-five"

const board = new five.Board()

board.on("ready", function () {
  const photoresistor = new five.Sensor({
    pin: "A0",
    freq: 500,
  })

  photoresistor.on("data", function () {
    console.log(this.value)
  })
})
