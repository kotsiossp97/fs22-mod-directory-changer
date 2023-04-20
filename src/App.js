
import { useState, useEffect } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "./Global/Themes";
import { getCurrentDir } from "./Global/DirectoryFunctions";

import TopBar from "./Components/TopBar";
import Footer from "./Components/Footer";
import CurrentDirectoryCard from "./Components/CurrentDirectoryCard";
import ChangeDirectoryCard from "./Components/ChangeDirectoryCard";
import BottomButtons from "./Components/BottomButtons";


function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(true)
  const [isActiveOverride, setIsActiveOverride] = useState(false)
  const [currentDir, setCurrentDir] = useState("")

  const refreshData = ()=>{
    getCurrentDir().then((data)=>{
      setIsActiveOverride(data.isActive)
      setCurrentDir(data.currentDir)
    })
  }

  useEffect( ()=>{
    refreshData()
  }, [isActiveOverride])

  const handleToggleOverride = ()=>{
    window.electronApi.toggleOverride()
    setIsActiveOverride(prev=> !prev)
  }

  return (
    <ThemeProvider theme={isDarkTheme?darkTheme:lightTheme}>
        <CssBaseline />
        <TopBar darkThemeHandler={setIsDarkTheme} />

        <CurrentDirectoryCard currentDir={currentDir} isActiveOverride={isActiveOverride} />

        <ChangeDirectoryCard refresh={refreshData} />

        <BottomButtons overrideHandler={handleToggleOverride} />

        <Footer />
    </ThemeProvider>
  );
}

export default App;
