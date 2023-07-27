import React from "react";
import "./App.css";
import CustomForm from "./components/CustomForm/CustomForm";
import { StyledDivContainer, StyledH1 } from "./App.Styled";

function App() {
  return (
    <StyledDivContainer>
      <StyledH1>
        Загрузить данные в Яндекс
        Диск
      </StyledH1>
      <CustomForm />
    </StyledDivContainer>
  );
}

export default App;
