const electron = require('electron')
const { app, BrowserWindow, Tray, Menu, MenuItem , ipcMain } = electron


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;
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



        mainWindow = new BrowserWindow({
            width: 480,
            height: 270,
          /*  x: width - 370,
            y: height - 230,*/
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

      //  mainWindow.setFullScreen(true)
        mainWindow.setFullScreenable(false)

        mainWindow.setMenuBarVisibility(false)



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
        mainWindow.webContents.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 12_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) GSA/76.0.253539693 Mobile/16F203 Safari/604.1')

        appIcon.setContextMenu(contextMenu)

        // and load the index.html of the app.
       // mainWindow.loadURL(path.join('file://', __dirname, '/html/webview.html'))
        mainWindow.loadURL("https://m.youtube.com/watch?v=I17kM2CwCGM")

        mainWindow.webContents.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 12_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) GSA/76.0.253539693 Mobile/16F203 Safari/604.1')
        // Open the DevTools.
        // win.webContents.openDevTools()
        mainWindow.webContents.on('did-finish-load', function () {

           mainWindow.webContents.insertCSS('button#p-back-browser{\n' +
               '    padding: 0 10px;\n' +
               '}\n' +
               'i.ic-back-browser{\n' +
               '    border: solid white;\n' +
               '    border-width: 0 5px 5px 0;\n' +
               '    display: inline-block;\n' +
               '    padding: 5px;\n' +
               '    transform: rotate(135deg);\n' +
               '  -webkit-transform: rotate(135deg);\n' +
               '}');
        });
        mainWindow.webContents.on('did-start-loading', function () {
            mainWindow.webContents.executeJavaScript('setTimeout(function(){\n' +
                '    if(!document.getElementById("p-back-browser")){\n' +
                '        var node = document.createElement("button");\n' +
                '        var icon = document.createElement(\'i\');\n' +
                '        icon.className = "ic-back-browser"\n' +
                '        node.id="p-back-browser";\n' +
                '        node.onclick  = function(){\n' +
                '            window.history.back();\n' +
                '        }\n' +
                '        node.appendChild(icon);\n' +
                '        document.querySelector(\'.mobile-topbar-header\').prepend(node);\n' +
                '    }\n' +
                '}, 1000);');
        });


        mainWindow.on('minimize',function(event){
            event.preventDefault();
            mainWindow.hide();
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

