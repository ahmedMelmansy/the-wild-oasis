import styled from "styled-components";
const H1 = styled.h1`
  ${props => props.type ==='h1' && `
  font-size: 80px;
  font-weight: bold;
  text-transform: capitalize;
  background-color: blue;
  color: white;
  padding: 2rem;
  `}
 ${props => props.type ==='h2' && `
  font-size: 60px;
  font-weight: 500;
  text-transform: capitalize;
  background-color: red;
  color: white;
  padding: 1.5rem;
  `}
${props => props.type ==='h3' && `
  font-size: 40px;
  font-weight: bold;
  text-transform: capitalize;
  background-color: blue;
  color: white;
  padding: 2rem;
  `}
  ${props => props.type ==='h4' && `
  font-size: 30px;
  font-weight: semibold;
  text-align:center; 
  text-transform: capitalize;
  // background-color: red;
  color: #000000;
  padding: 1rem;
  `}
`;

export default H1