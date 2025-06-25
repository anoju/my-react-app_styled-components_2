import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import GlobalStyle from "./styled/globalStyled";
import TitleStyled from "./styled/TitleStyled";
import { styled } from "styled-components";

const Container = styled.div`
  text-align: center;
  padding: 2rem;
`;

const Button = styled.button`
  background: ${(props) => (props.$primary ? "#4CAF50" : "#ddd")};
  color: ${(props) => (props.$primary ? "white" : "#333")};
  padding: 12px 24px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <GlobalStyle></GlobalStyle>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <TitleStyled>타이틀</TitleStyled>
      <Container>
        <Button>Normal Button</Button>
        <Button $primary>Primary Button</Button>
      </Container>
    </>
  );
}

export default App;
