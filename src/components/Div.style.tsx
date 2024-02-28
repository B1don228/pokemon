import styled from "styled-components";

const StyledDiv = styled.div`
  border: 1px solid black;
  text-align: center;
  padding: 3%;
  width: calc(25.33% - 1%);
  border-radius: 10px;
  @media (max-width: 800px) {
    width: calc(33.33% - 1%);
    border-radius: 10px;
  }
  color: #1f376f;
  font-family: "Micro 5", sans-serif;
  font-size: 30px;
  transition: all 300ms ease-in-out;
  &:hover {
    background-color: #1f376f;
    cursor: pointer;
    color: white;
  }
`;

export default StyledDiv;
