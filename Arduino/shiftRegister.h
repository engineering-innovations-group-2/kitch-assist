#include "Arduino.h"
#include "binary.h"

#define DATA_PIN 10 
#define LATCH_PIN 9
#define CLOCK_PIN 8


void updateShiftRegister(byte shiftRegisterOutputPinPattern){
  //set latch_pin to low first.
  digitalWrite(LATCH_PIN, LOW);

  //This handles the pushing of the bits to the shift register.
  shiftOut(DATA_PIN, CLOCK_PIN, LSBFIRST, shiftRegisterOutputPinPattern);

  //set the latch_pin to high to copy the new pattern to the output.
  digitalWrite(LATCH_PIN, HIGH);
}