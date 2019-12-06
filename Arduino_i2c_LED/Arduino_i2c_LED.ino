#include <Wire.h>

#define adresse 0x05
#define led_pin 13
int zahl = 0;


void setup() {
  pinMode(led_pin, OUTPUT);
  Serial.begin(9600);
  Wire.begin(adresse);

  Wire.onReceive(empfangeDaten);
  Wire.onRequest(sendeDaten);

  Serial.println("Bereit");
}

void loop() {
  delay(100);
}

void empfangeDaten(int byteCount) {
  while (Wire.available()) {
    zahl = Wire.read();
    Serial.print("Daten erhalten: ");
    Serial.println(zahl);

    digitalWrite(led_pin, zahl);
    // if (zahl == 1) {
    //     digitalWrite(LED_BUILTIN, HIGH);
    // } else {
    //     digitalWrite(LED_BUILTIN, LOW);
    // }
  }
}

void sendeDaten() {
  Wire.write(zahl);
}
