const {app, BrowserWindow, ipcMain, dialog} = require('electron')
const path = require('path')

const createWindow=() => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  ipcMain.on('set-title', (event, title) => {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.setTitle(title)
  })

  mainWindow.loadFile('index.html')
}
const handleFile=async ()=>{
    const {canceled, filePaths}=await dialog.showOpenDialog();
    if(canceled){
        return null
    }else{
        return filePaths[0]
    }
}

app.whenReady().then(() => {
  ipcMain.handle('dialog:openFile',handleFile)
  createWindow()
  
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})