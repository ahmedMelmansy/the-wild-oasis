import styled from "styled-components"
import Logout from "../features/authentication/Logout"
import ButtonIcon from "./ButtonIcon"
import { HiOutlineUser } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import DarkMode from "./DarkMode";




const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 1.4rem;
`
export default function HeaderMenu() {
  const navigate = useNavigate()
  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={()=>navigate('/account')}>
            <HiOutlineUser/>
        </ButtonIcon>
      </li>
      <li><DarkMode/></li>
      <li><Logout/></li>

    </StyledHeaderMenu>
  )
}
