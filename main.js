const electron = require('electron')
const { app, BrowserWindow, Tray, Menu, MenuItem , ipcMain } = electron


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;
const fs = require("fs");
const path = require('path');
const debug = /--debug/.test(process.argv[2])
function initialize () {
    makeSingleInstance();
    function createWindow () {
        // Create the browser window.
        let display = electron.screen.getPrimaryDisplay();
        let width = display.bounds.width;
        let height = display.bounds.height;
        let settingWindow;
        let youtubeWindow;



        mainWindow = new BrowserWindow({
            width: 360,
            height: 180,
            x: width - 370,
            y: height - 230,
            webPreferences: {
                nodeIntegration: true
            },
            icon:path.join(__dirname, '/assets/images/icon.png'),
            frame: false,
            skipTaskbar: true,
            alwaysOnTop: true,
            resizable: false,
            transparent: true,

        });


        var appIcon = new Tray(path.join(__dirname, '/assets/images/icon.png'));

        var contextMenu = Menu.buildFromTemplate([
            {
                label: 'Show App', click: function () {
                    mainWindow.show()
                }
            },
            {
                label: 'Quit', click: function () {
                    app.isQuiting = true
                    app.quit()
                }
            }
        ]);

        appIcon.setContextMenu(contextMenu)

        // and load the index.html of the app.
        mainWindow.loadURL(path.join('file://', __dirname, '/index.html'))


        mainWindow.on('minimize',function(event){
            event.preventDefault();
            mainWindow.hide();
        });

        ipcMain.on('open-youtube', function () {
            if(!youtubeWindow){
                youtubeWindow = new BrowserWindow({
                    width: 480,
                    height: 270,
                    x: width - 480,
                    y: height - 310,
                    parent: mainWindow,
                    frame: false,
                    skipTaskbar: true,
                    alwaysOnTop: true,
                    resizable: false,
                    transparent: true,
                });
                youtubeWindow.webContents.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 12_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) GSA/76.0.253539693 Mobile/16F203 Safari/604.1')
                youtubeWindow.loadURL("https://m.youtube.com");
                youtubeWindow.setFullScreenable(false);
            }
            youtubeWindow.webContents.on('did-finish-load', function () {
                youtubeWindow.webContents.insertCSS('body{\n' +
                    '        overflow: auto!important;\n' +
                    '    }\n' +
                    '\n' +
                    '    i.ic-back-browser {\n' +
                    '        border: solid #3578E5;\n' +
                    '        border-width: 0 15px 15px 0;\n' +
                    '        display: inline-block;\n' +
                    '        margin-left: 10px;\n' +
                    '        transform: rotate(45deg);\n' +
                    '        -webkit-transform: rotate(45deg);\n' +
                    '    }\n' +
                    '    .open-app-button, #player{\n' +
                    '        -webkit-app-region: drag;\n' +
                    '        -webkit-user-select: none;\n' +
                    '    }\n' +
                    '    .titlebar{\n' +
                    '        width: auto!important;\n' +
                    '        right: 100px!important;\n' +
                    '        left: 100px!important;\n' +
                    '        top: 8px!important;\n' +
                    '    }');
            });

            const js = fs.readFileSync('addbutton.js').toString();
            youtubeWindow.webContents.on('did-start-loading', function () {
                youtubeWindow.webContents.executeJavaScript(js);
            });
            const jsData = fs.readFileSync('showMenuYouTube.js').toString();
            youtubeWindow.webContents.once('dom-ready', () => {
                youtubeWindow.webContents.executeJavaScript(jsData, false);
            });

            youtubeWindow.on('closed', function (event) {
                youtubeWindow = null
            });

            youtubeWindow.on('minimize',function(event){
                youtubeWindow = null
            });
        });

        ipcMain.on('open-setting',function(){
            if(!settingWindow){
                settingWindow = new BrowserWindow({
                    height: 360,
                    width: 640,
                    parent: mainWindow,
                    frame: false,
                    skipTaskbar: true,
                    transparent: true,
                });
                settingWindow.loadURL(path.join('file://', __dirname, '/html/setting.html'))
            }
            settingWindow.on('closed', function (event) {
                settingWindow = null
            })
        });


        ipcMain.on('close-app',function(){
            app.isQuiting = true
            app.quit()
        });



        mainWindow.on('close', function (event) {
            mainWindow = null
        });

        // Emitted when the window is closed.
        mainWindow.on('closed', () => {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            mainWindow = null
        });

        mainWindow.on('show', function () {
            appIcon.setHighlightMode('always')
        });

        if (debug) {
            mainWindow.webContents.openDevTools()
            mainWindow.maximize()
            require('devtron').install()
        }
    }
    app.setLoginItemSettings({
        openAtLogin: true,
        path: process.execPath
    });

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
    app.on('ready', () => {
        createWindow()
    })
// Quit when all windows are closed.
    app.on('window-all-closed', () => {
        // On macOS it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            app.quit()
        }
    });

    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (mainWindow === null) {
            createWindow()
        }
    });
}

// Make this app a single instance app.
//
// The main window will be restored and focused instead of a second window
// opened when a person attempts to launch a second instance.
//
// Returns true if the current version of the app should quit instead of
// launching.
function makeSingleInstance () {
    if (process.mas) return

    app.requestSingleInstanceLock()

    app.on('second-instance', () => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore()
            mainWindow.focus()
        }
    })
}
initialize();


/*
setTimeout(function(){
    if(!document.getElementById("p-back-browser")){
        var node = document.createElement("button");
        var icon = document.createElement('i');
        icon.className = "ic-back-browser"
        node.id="p-back-browser";
        node.onclick  = function(){
            const customTitlebar = require('custom-electron-titlebar');
            new customTitlebar.Titlebar({
                backgroundColor: customTitlebar.Color.fromHex('#444')
            });
            window.history.back();
        }
        node.appendChild(icon);
        document.querySelector('.mobile-topbar-header').prepend(node);
    }
}, 1000);
*/


/*
button#p-back-browser{
    padding: 0 10px;
}
i.ic-back-browser{
    border: solid white;
    border-width: 0 5px 5px 0;
    display: inline-block;
    padding: 5px;
    transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
}
*/

