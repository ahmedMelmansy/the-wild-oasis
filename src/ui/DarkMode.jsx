import { MdDarkMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md"
import ButtonIcon from './ButtonIcon'
import { useDarkMode } from "../contexts/DarkMode";

export default function DarkMode() {
    const{isDarkMode , toggleDarkMode } = useDarkMode()
  return (

        <ButtonIcon
        onClick={toggleDarkMode}
        >
        {isDarkMode?<MdDarkMode/>:<MdOutlineDarkMode/>}        
        </ButtonIcon>
    
  )
}
