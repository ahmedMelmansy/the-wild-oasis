import styled from "styled-components"
import HeaderMenu from "./HeaderMenu"
import UserAvatar from '../features/authentication/UserAvatar'
const StyledHeader =styled.header`
  background-color: var(--color-grey-0);
   padding: 1.8rem;
   border-bottom: 1px var(--color-gray-100) solid;
   display: flex;
   justify-content: flex-end;
   align-items: center;
   gap: 3rem;
`
export default function Header() {
  return (
    <StyledHeader>
      <UserAvatar/>
     <HeaderMenu/>
    </StyledHeader>
  )
}
