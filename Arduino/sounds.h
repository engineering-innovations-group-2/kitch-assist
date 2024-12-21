#include "Arduino.h"
int OPENING_MELODY[] = {
  200, 300, 560, 700, 600, 200
};
int STOP_MELODY[] = {
  900, 500, 900, 500, 900, 500
};

void startSound(int soundOutPin){
  for(int i = 0; i < 6; i++){
    Serial.println("hi");
    tone(soundOutPin, OPENING_MELODY[i]);
    delay(OPENING_MELODY[i]);
  }
  noTone(soundOutPin);
}

void stopSound(int soundOutPin){
  for(int i = 0; i < 6; i++){
    tone(soundOutPin, STOP_MELODY[i]);
    delay(900);
  }
  noTone(soundOutPin);
}

//write a melody for a preempted operation.
//write another for start of cooking.