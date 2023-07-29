import React from "react";
import CustomForm from "./components/CustomForm/CustomForm";
import { StyledDivContainer, StyledH1, StyledDivApp } from "./App.Styled";

function App() {
  return (
    <StyledDivApp>
      <StyledDivContainer>
        <StyledH1>Загрузите данные в Яндекс Диск</StyledH1>
        <CustomForm />
      </StyledDivContainer>
    </StyledDivApp>
  );
}

export default App;
