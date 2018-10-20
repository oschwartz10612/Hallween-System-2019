int relay1 = 1;
int relay2 = 1;
char c;

void setup() {
  pinMode(8, OUTPUT);
  pinMode(9, OUTPUT);

  Serial.begin(9600);
}

void loop() {
  if (Serial.available()) {
    relay1 = Serial.parseInt();
    relay2 = Serial.parseInt();
    c = Serial.read();
  }
  
  digitalWrite(8, relay1);
  digitalWrite(9, relay2);
  
  delay(10);
}
