const path = require('path');

const { app, BrowserWindow, ipcMain, shell, dialog } = require('electron');
const isDev = require('electron-is-dev');
const fs = require('fs');


const DEFAULT_DIR = app.getPath("documents") + "\\My Games\\FarmingSimulator2022\\mods"
const FS_SETTINGS_PATH = app.getPath("documents") + "\\My Games\\FarmingSimulator2022\\gameSettings.xml"

const readFile = () =>{

  return fs.readFileSync(FS_SETTINGS_PATH, 'utf-8')
}

const writeFile = (newContent) => {
  fs.writeFileSync(FS_SETTINGS_PATH, newContent)
}

const toggleOverride = () => {
  const fileLines = readFile().split('\n')
  let newContent = ""

  for( var line of fileLines){
    let strippedLine = line.trim()
    if(strippedLine.includes("modsDirectoryOverride") && !strippedLine.includes("<!--")){
      let str1 = strippedLine.split("active")[1]
      let currentActive = str1.split("\"")[1]
      let active = "true"
      if( currentActive === "true"){
        active = "false"
      }
      let newLine = strippedLine.replace(currentActive, active)
      newContent += newLine + "\n"
    }
    else{
      newContent += strippedLine + "\n"
    }
  }

  // Write file
  writeFile(newContent)

}

const addDirOverrideLine = () => {
  const fileLines = readFile().split('\n')
  let newContent = ""

  for(var line of fileLines){
    let strippedLine = line.trim()
    if(strippedLine.includes("gameSettings revision")){
      strippedLine += '\n<modsDirectoryOverride active="false" directory=" " />'
    }

    newContent += strippedLine + '\n'
  }

  // Write file
  writeFile(newContent)
}

const getCurrentDir = () => {
  const fileLines = readFile().split("\n")
  let inIf = false
  let currentDir = ""
  let isActive = false
  for(var line of fileLines){
    let strippedLine = line.trim()
    if(strippedLine.includes("modsDirectoryOverride") && !strippedLine.includes("<!--")){
        inIf = true
        let str1 = strippedLine.split("directory")[1]
        let str2 = strippedLine.split("active")[1]
        currentDir = str1.split("\"")[1]
        isActive = str2.split("\"")[1] === "true"
    }
  }

  if( !inIf ){
    addDirOverrideLine()
    getCurrentDir()
    return
  }
  return { currentDir: currentDir, isActive: isActive }
}

const openPath = (path) => {
  if(path === "" || path === " "){
    shell.openPath(DEFAULT_DIR)
  }
  else{
    shell.openPath(path)
  }
}


const writeDirectories = (dirs)=>{
  const file = path.join(__dirname,'Directories.json')
  // console.log(file)
  fs.writeFileSync(file, dirs)
}

const changeDirectory = (newDir) => {
  if(newDir === "Default"){
    newDir = ""
  }

  const fileLines = readFile().split("\n")
  let newContent = ""

  for(var line of fileLines){
    let strippedLine = line.trim()
    if(strippedLine.includes("modsDirectoryOverride") && !strippedLine.includes("<!--")){
      let str1 = strippedLine.split("active")[1]
      let currentActive = str1.split("\"")[1]

      const newLine = '<modsDirectoryOverride active="'+currentActive+'" directory="'+newDir+'"/>'
      newContent += newLine + "\n"
    }
    else{
      newContent += strippedLine + "\n"
    }
  }

  writeFile(newContent)
}

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 900,
    height: 700,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      // nodeIntegration: true,
      // enableRemoteModule: true,
    },
  });


  const folderDialog = () => {
    return dialog.showOpenDialogSync(win, { properties: ["openDirectory"]})
  }

  const Minimize = () => {
    win.minimize()
  }
  
  const Maximize = () => {
    if(win.isMaximized()){
      win.restore()
    }
    else{
      win.maximize()
    }
  }

  const launchFS = () => {
    shell.openPath("steam://rungameid/1248130")
  }


  ipcMain.handle('currentDir', ()=> getCurrentDir() )
  ipcMain.handle('toggleOverride', ()=> toggleOverride() )
  ipcMain.handle('changeDirectory', (ev,dir)=> changeDirectory(dir) )
  ipcMain.handle('openPath', (ev,path)=> openPath(path) )
  ipcMain.handle("folderDialog", () => folderDialog() )
  ipcMain.handle("writeDirectories", (ev,dirs)=> writeDirectories(dirs))
  ipcMain.handle("exitApp", () => app.quit())
  ipcMain.handle("minimize", () => Minimize())
  ipcMain.handle("maximize", () => Maximize())
  ipcMain.handle("launchFS", () => launchFS())

  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

