const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
//    one way ipc
    setTitle: (title) => ipcRenderer.send('set-title', title),
    // two way ipc
    openFile:()=>ipcRenderer.invoke('dialog:openFile')
})