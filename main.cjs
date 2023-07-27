require('dotenv').config()
const {app, BrowserWindow} = require('electron')
const PROTOCOL = process.env.PROTOCOL || 'http'
const HOST = process.env.HOST || 'localhost'
const PORT = process.env.PORT || 3000

function start() {
    const createWindow = () => {
        const mainWindow = new BrowserWindow({
            width: 800,
            height: 600
        })
        mainWindow.loadURL(`${PROTOCOL}://${HOST}:${PORT}`)
    }
    app.whenReady().then(() => {
        createWindow()
        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) createWindow()
        })
    })
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') app.quit()
    })
}

if (!app.isPackaged) {
    start();
}

if (app.isPackaged) {
    // Load server and run
    import('alloctrl/build/index.js').then(start)
}
