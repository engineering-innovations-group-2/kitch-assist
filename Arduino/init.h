#include <LiquidCrystal_I2C.h>
#include "shiftRegister.h"
#include "sounds.h"

int soundOutPin = 5;
LiquidCrystal_I2C lcd(0x27, 16, 2);

void helloTone(){
  tone(soundOutPin, 900, 2000);
}

void sayHello(){
  //sets the led to red
  updateShiftRegister(B10000000);
  

  //welcome the user on lcd.
  lcd.setCursor(2,0);
  lcd.print("HI, I'M YOUR");
  lcd.setCursor(2,1);
  lcd.print("KITCH ASSIST");

  //sing that beautiful hello tone.
  // helloTone();
  startSound(soundOutPin);

  delay(2000);
  lcd.clear();
  return;
}
