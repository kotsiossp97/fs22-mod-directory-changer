
export const getCurrentDir = async ()=>{
    const file = await window.electronApi.currentDir()

    return file
    // const lines = file.split('\n')
    // for(var line of lines){
    //     let strippedLine = line.trim()
    //     if(strippedLine.includes("modsDirectoryOverride") 
    //         && !strippedLine.includes("<!--")){
    //         console.log(strippedLine)

    //         let str1 = strippedLine.split("directory")[1]
    //         let str2 = strippedLine.split("active")[1]
    //         const currentDir = str1.split("\"")[1]
    //         const isActive = str2.split("\"")[1]

    //         return { currentDir: currentDir, isActive: isActive==="true" }
    //     }
    // }
}


export const getDirectories = async () => {

    const directories = await window.electronApi.getDirectories()
    return directories
    
    // const response = await fetch(process.env.PUBLIC_URL+"/Directories.json")
    // const text = await response.json()

    // return text
}