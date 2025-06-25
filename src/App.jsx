import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { styled } from 'styled-components';
import GlobalStyle from './styled/globalStyled.js';
import AutoRouter from './utils/AutoRouter';

const AppContainer = styled.div`
  min-height: 100vh;
  background: #f0f2f5;
  padding: 1rem;
`;

const Header = styled.header`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 2rem;
  margin-bottom: 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  
  h1 {
    margin: 0;
    font-size: 2rem;
    font-weight: 600;
  }
  
  p {
    margin: 0.5rem 0 0 0;
    opacity: 0.9;
    font-size: 1.1rem;
  }
`;

const DebugInfo = styled.div`
  background: #fffbe6;
  border: 1px solid #ffd666;
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 1rem;
  font-size: 14px;
  
  p {
    margin: 0.5rem 0;
  }
`;

function App() {
  console.log('App 컴포넌트가 렌더링되었습니다.');
  
  return (
    <Router>
      <GlobalStyle />
      <AppContainer>
        <Header>
          <h1>🚀 React Auto Router</h1>
          <p>pages 폴더 기반 자동 라우팅 시스템</p>
        </Header>
        
        <DebugInfo>
          <p><strong>디버깅 정보:</strong></p>
          <p>• 현재 URL: {window.location.pathname}</p>
          <p>• 라우터 상태: 정상 작동중</p>
          <p>• 페이지 전환이 안 되면 개발자 도구(F12) → Console 탭에서 에러를 확인하세요</p>
        </DebugInfo>
        
        <AutoRouter />
      </AppContainer>
    </Router>
  );
}

export default App;