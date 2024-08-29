/**
 * 器材準備：Arduino UNO、Joystick、公對母杜邦線
 * 實現效果：
 *
 * Ref: Joystick: https://johnny-five.io/api/joystick/
 *  */

import five from "johnny-five"

const board = new five.Board()

board.on("ready", function () {
  const joy = new five.Joystick({
    pins: ["A0", "A1"],
  })

  joy.on("change", function () {
    console.log(this.x)
    console.log(this.y)
  })
})
