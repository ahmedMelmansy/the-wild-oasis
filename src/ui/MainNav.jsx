import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { IoHome } from "react-icons/io5";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { GiWoodCabin } from "react-icons/gi";
import { FaUsers } from "react-icons/fa6";
import { CiSettings } from "react-icons/ci";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

export default function MainNav() {
  return (
    <div>
      <NavList>

        <li>
          <StyledNavLink to='/dashboard'>
          <IoHome/>
          <span>Home</span>
        </StyledNavLink>
        </li>
        
        <li>
          <StyledNavLink to='/bookings'>
          < HiOutlineCalendarDays/>
          <span>Booking</span>
        </StyledNavLink>
        </li>
        
        <li>
          <StyledNavLink to='/cabins'>
          <  GiWoodCabin/>
          <span>Cabins</span>
        </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to='/users'>
          <  FaUsers/>
          <span>users</span>
        </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to='/settings'>
          <CiSettings/>
          <span>settings</span>
        </StyledNavLink>
        </li>
        

        
      </NavList>
    </div>
  )
}
