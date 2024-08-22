/**
 * 器材準備：Arduino UNO、RGB LED、杜邦線
 * 實現效果：隨機顏色、呼吸效果
 *
 * RGB LED 若共腳為 VCC 為共陽極版本、為 GND 則為共陰極版本
 * Led.RGB.isAnode 預設 false（共陰極），若為共陽極則要設為 true
 *
 * ref: https://johnny-five.io/api/led.rgb/
 *  */

import five from "johnny-five"

const board = new five.Board()

board.on("ready", function () {
  let led = new five.Led.RGB([3, 6, 11]) // 依照 R、G、B 對應的 pin 填寫

  let currentInterval = null
  let currentColor = null
  let wavePhase = 0

  const stopCurrentEffect = () => {
    if (currentInterval) {
      clearInterval(currentInterval)
      currentInterval = null
    }
  }

  this.repl.inject({
    pick() {
      stopCurrentEffect()
      currentColor = getRandomHexValue()
      led.color(currentColor)
    },
    random() {
      stopCurrentEffect()
      currentInterval = setInterval(() => {
        currentColor = getRandomHexValue()
        led.color(currentColor)
      }, 1000)
    },
    breathe() {
      stopCurrentEffect()
      if (!currentColor) {
        currentColor = getRandomHexValue()
      }
      led.color(currentColor)
      currentInterval = setInterval(() => {
        // 使用 Math.cos() 來實現從亮到暗再到亮的效果
        const brightness = Math.cos(wavePhase) * 50 + 50 // 亮度範圍：0-100
        led.intensity(brightness)
        wavePhase += 0.05
        // 當走完一個完整的週期就重置 wavePhase，使呼吸效果不間斷
        if (wavePhase > Math.PI * 2) {
          wavePhase = 0
        }
      }, 50)
    },
    off() {
      stopCurrentEffect()
      led.off()
      currentColor = null
    },
  })
})

const getRandomHexValue = () => {
  const getHexBytes = () =>
    Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, "0")

  return `#${getHexBytes()}${getHexBytes()}${getHexBytes()}`
}
