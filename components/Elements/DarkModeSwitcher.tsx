import ReactSwitch from "react-switch"
import { useContext } from "react"
import { ColorThemeContext } from "@/context/ColorTheme"

export const DarkModeSwitcher=()=>{
    const {colorTheme,setColorTheme}= useContext(ColorThemeContext)
    return(
        <>
            <ReactSwitch onChange={()=>setColorTheme()}/>
        </>
    )
}