import styled from "styled-components";

const StyledDivContainer = styled.div`
box-sizing: border-box;
  max-width: 1120px;
  margin: 50px auto;
  padding: 15px 30px;
  border-radius: 7px;
  background-color: #fff;
`;

const StyledH1 = styled.h1`
  text-align: center;
  color: black;
`;

const StyledDivApp = styled.div`
  width: 100%;
  min-height: 100vh;
  background-image: linear-gradient(257deg, #f59c07, #f57507);
  padding: 50px;
  font-family: "Roboto", sans-serif;
`;

export { StyledDivContainer, StyledH1, StyledDivApp };
