const electron = require('electron');
require('electron-reload')(__dirname);
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

app.setBadgeCount(55);

// get important file system path
console.log(app.getPath('desktop')); // get desktop location
console.log(app.getPath('music')); // get music folder location
console.log(app.getPath('temp')); // C:\Users\{user}-~1\AppData\Local\Temp 
console.log(app.getPath('userData')); // get path of user data storage (Eg: C:\Users\{username}\AppData\Roaming\electron-quick-start)


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

// Before quitting Event
app.on('before-quit',function(e){
  console.log('App is about to quit. Stopping Quitting');

  //to prevent the default behavior of before-quit evnet.
  // e.preventDefault();
})

// when window is blur we can quit app after 3 second using app.quit() method
// Browser window  blur envent
app.on('browser-window-blur',function(){
  console.log('App is no longer focused.');
  // setTimeout(app.quit, 3000);
});

// Browser windows focus
app.on('browser-window-focus',function(){
  console.log('App is on foucus now.');
});


app.on('ready', function (e) {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  //  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
