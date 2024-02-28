import styled from "styled-components";

const StyledButton = styled.button`
  background-color: #00dd00;
  width: 200px;
  height: 50px;
  border: none;
  border-radius: 10px;
  transition: all ease-in-out 300ms;
  font-family: "Anta", sans-serif;
  color: #4e009b;
  &:hover {
    background-color: #00ec00;
    cursor: pointer;
  }
`;

export default StyledButton;
