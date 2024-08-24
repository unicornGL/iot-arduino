#include "DHT.h"
#include <LiquidCrystal_PCF8574.h>

#define DHTPIN 2
#define DHTTYPE DHT11
#define LCD_ADDRESS 0x27 // 1602 LCD address 通常為 0x27 或 0x3F 其中一種
#define LCD_COLS 16
#define LCD_ROWS 2

DHT dht(DHTPIN, DHTTYPE);
LiquidCrystal_PCF8574 lcd(LCD_ADDRESS);

void setup() {
  Serial.begin(9600);
  dht.begin();
  lcd.begin(LCD_COLS, LCD_ROWS);
  lcd.setBacklight(255);
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("T & RH Sensor");
  Serial.println("Sensor and LCD initialized");
  delay(2000);
}

void loop() {
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();
  
  if (isnan(temperature) || isnan(humidity)) {
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Sensor Error!");
    Serial.println("DHT sensor error");
    delay(2000);
    return;
  }
  
  lcd.clear();
  displayLcd("Temp:", temperature, "C", 0);
  displayLcd("Hum :", humidity, "%", 1);
  delay(5000);
}

void displayLcd(const char* label, float value, const char* unit, int row) {
  lcd.setCursor(0, row);
  lcd.print(label);
  lcd.setCursor(6, row);
  lcd.print(value, 1);
  lcd.setCursor(11, row);
  if (strcmp(unit, "C") == 0) {
    lcd.print((char)223);  // 度數符號
    lcd.print(unit);
  } else {
    lcd.print(unit);
  }
}