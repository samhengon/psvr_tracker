# psvr_tracker
Use OpenTrack to trace PSVR and Android rotation and send Key command to trigger recenter

**currently this is for Windows only, as most of the racing titles are run on Windows**

Pre-requisit:
1. install OpenTrack;
2. install iVRY;
3. windows-build-tools npm package (npm install --global --production windows-build-tools from an elevated PowerShell or CMD.exe);
4. Node.js
5. npm
6. an Android phone, with OpenTrack app installed
7. tie your Android phone onto PSVR

How to use:
1. open 2 instances of OpenTrack:
+ PSVR - Input: SteamVR, Output: UDP over network (port 6666)
+ Phone - Input: UDP over network (port 4242), Output: UDP over network (port 5555)
+ Set hot key "ctrl+enter" to toggle tracking
+ Set hot key "ctrl+up" to toggle center
2. start OpenTrack app on Android phone, connects to your OpenTrack. Your phone and your PC should be in same network.
3. press keyboard to: toggle tracking (ctrl+enter), and toggle center (ctrl+up)
4. set "ctrl+space" in your racing title as the input to recenter
5. start up the node.js program
6. start your VR
enjoy!
