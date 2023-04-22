const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronApi', {
    currentDir: () => ipcRenderer.invoke('currentDir'),
    toggleOverride: () => ipcRenderer.invoke('toggleOverride'),
    changeDirectory: (dir) => ipcRenderer.invoke('changeDirectory', dir),
    openPath: (path)=> ipcRenderer.invoke("openPath", path),
    folderDialog: () => ipcRenderer.invoke("folderDialog"),
    getDirectories: () => ipcRenderer.invoke("getDirectories"),
    writeDirectories: (dirs) => ipcRenderer.invoke("writeDirectories", dirs),
    launchFS: () => ipcRenderer.invoke("launchFS"),
    minimize: () => ipcRenderer.invoke("minimize"),
    maximize: () => ipcRenderer.invoke("maximize"),
    exitApp: () => ipcRenderer.invoke("exitApp"),
    settingsFileExists: () => ipcRenderer.invoke("settingsFileExists"),
})