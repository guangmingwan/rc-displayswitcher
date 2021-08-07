# rc-displayswitcher
rc掌机显示设备切换

开机按 A 键 切换输出到HDMI设备，并且重新启动
开机按 B 键 切换输出到LCD设备，并且重新启动

=== how to install ===

`sudo apt-get install nodejs npm`

克隆项目到 /home/pi/displayswitcher

然后

`npm install`

再在 /etc/rc.local添加启动项即可使用

`sudo node /home/pi/displayswitcher/main.js`
`exit 0`

