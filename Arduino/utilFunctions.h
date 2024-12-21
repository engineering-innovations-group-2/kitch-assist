unsigned long timeToMillSec(String timeStr){
  String hourStr = timeStr.substring(1,3);
  String minStr = timeStr.substring(4,6);
  String secStr = timeStr.substring(7,9);
  unsigned int hourInt = hourStr.toInt();
  unsigned int minInt = minStr.toInt();
  unsigned int secInt = secStr.toInt();
  unsigned long result = (hourInt * 3600000) + (minInt * 60000) + (secInt * 1000);

  // Serial.println(hourInt * 3600000);
  // Serial.println(minInt * 60000);
  // Serial.println(secInt * 1000);
  
  return result;
}

// void startTone(int soundOutPin){
//   tone(soundO)
// }