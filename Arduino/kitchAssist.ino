#include <SoftwareSerial.h>
#include "init.h"
#include "utilFunctions.h"
#define BLU_RX 2
#define BLU_TX 3
#define RELAY_PIN 7

SoftwareSerial bluetooth(BLU_RX, BLU_TX);

void setup() {
  lcd.init();
  lcd.clear();
  lcd.backlight();

  //initializing pins here.
  
  //data_pin, latch_pin, and clock_pin are defined in shiftRegister.h
  //these pins are for the shift register.
  pinMode(DATA_PIN, OUTPUT);
  pinMode(LATCH_PIN, OUTPUT);
  pinMode(CLOCK_PIN, OUTPUT);
  
  //intializing the bluetooth module pins.
  pinMode(BLU_RX, INPUT);
  pinMode(BLU_TX, OUTPUT);

  // initializing the relay pin
  pinMode(RELAY_PIN, OUTPUT);
  
  //before you begin talking over serial or any other serial port, initialize the object or pin. 
  Serial.begin(9600);
  bluetooth.begin(9600);

  sayHello();
}


char state = 'N';
unsigned long milliseconds;
long* millSecPtr = &milliseconds;

long previousMilli = 0;
long* preMillPtr = &previousMilli;

long currentMilli;
long* currMillPtr = &currentMilli;

void loop() {
  //listen for commands from the bluetooth module. 
  //here we just print the message from the serial app.
    if (bluetooth.available()){
    //there's data available, proceed to cook.
    String timeString = bluetooth.readString();

    if (timeString.charAt(0) == 'C'){
      *millSecPtr = timeToMillSec(timeString);
      Serial.println(*millSecPtr);
      
      if (*millSecPtr){
        // START COUNTING THEN TURN DEVICE ON.
        state = 'C';
        digitalWrite(RELAY_PIN, HIGH);
        updateShiftRegister(B01000000);
        return;
      }
    } else if(timeString.charAt(0) == 'S'){
      //This signal is only sent to stop the operation
      digitalWrite(RELAY_PIN, LOW);

      //write to lcd that the power was cut off
      lcd.clear();
      lcd.setCursor(1, 0);
      lcd.print("THE OPERATION");
      lcd.setCursor(1, 1);
      lcd.print("WAS CANCELLED");

      //set the state to 'N', the default seeking state.
      state = 'N';
      updateShiftRegister(B10000000);
      stopSound(soundOutPin);
      lcd.clear();
    }

    Serial.println("Outsideeeee");
  }
  

  switch (state) {
  case 'N':
  // Serial.println("In the waiting state");
  //kitch assist hasn't recieved any commands yet.

  //ask the user to send a command.
  lcd.setCursor(0, 0);
  lcd.println("NO COMMANDS YET.");
  lcd.setCursor(1, 1);
  lcd.print("");
  break;

  //this case is for the cooking state.
  case 'C':
    *currMillPtr = millis();
    long interval = (*currMillPtr - *preMillPtr);
    
    if (*millSecPtr <= 0){
      //there's no time in the payload or the time has expired. 
      //Add the 'done' tone and led lights here.
      //consider the bluetooth signal that triggers the notifee api on the android.

      //THIS TURNS THE DEVICE OFF
      digitalWrite(RELAY_PIN, LOW);

      //write to lcd that the power was cut off
      lcd.clear();
      lcd.setCursor(2, 0);
      lcd.print("TIME UP !!");
      lcd.setCursor(1, 1);
      lcd.print("POWER WAS CUT");
      Serial.println("Should set LCD here");

      //set the state to 'N', the default seeking state.
      state = 'N';
      updateShiftRegister(B10000000);
      stopSound(soundOutPin);
      lcd.clear();
      return;
    }


    if(interval >= 1000){
      *millSecPtr = *millSecPtr - 1000;
      *preMillPtr = *currMillPtr;
    }
  break;

  //rare case where nothing is happening.
  default: 
    //break dawn to 0.
  break;
  }
}

  /*
    can you check the state of the bluetooth connection and change colors on connection and disconnection?
    you can also play some tones when it connects or disconnects.
    you can set up another interrupt pin.
  */