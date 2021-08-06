// Set a deadzone of +/-3500 (out of +/-32k) and a sensitivty of 350 to reduce signal noise in joystick axis
// add two line to end of /etc/rc.local
// sudo node /home/pi/displayswitcher/main.js
// exit 0
const exit = require('process').exit;
const fs = require("fs")
var joystick = new (require('joystick'))(0, 3500, 350);
joystick.on('button', checkButton);
function checkButton(event) {
  if (event.number == 2 && event.value == 1) {
    console.log("presss b,switching display to lcd");
    var config = fs.readFileSync("/boot/config.txt", "utf-8")
    config = config.replace('enable_dpi_lcd=0', 'enable_dpi_lcd=1')
    config = config.replace('display_default_lcd=0', 'display_default_lcd=1')
    fs.writeFileSync("/boot/config.txt", config, "utf-8");
    closeJoystick()
    setTimeout(() => {
      FFO_RebootWindow();
    }, 1000);
    console.log("reboot after 1 sec")
  }
  else if (event.number == 1 && event.value == 1) {
    console.log("presss a,switching display to hdmi");
    var config = fs.readFileSync("/boot/config.txt", "utf-8")
    config = config.replace('enable_dpi_lcd=1', 'enable_dpi_lcd=0')
    config = config.replace('display_default_lcd=1', 'display_default_lcd=0')
    fs.writeFileSync("/boot/config.txt", config, "utf-8");
    closeJoystick()
    setTimeout(() => {
      FFO_RebootWindow();
    }, 1000);
    console.log("reboot after 1 sec")
  }

}
function closeJoystick() {
  joystick.removeListener('button', checkButton);
}
function FFO_RebootWindow() {
  var execSync = require('child_process').execSync;
  execSync('reboot'); //reboot now
}
setTimeout(() => {
  closeJoystick();
  joystick.close();
  joystick = null;
  process.kill(process.pid);
}, 1000);
