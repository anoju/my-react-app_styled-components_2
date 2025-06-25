import React from 'react';
import { styled } from 'styled-components';

const HomeContainer = styled.div`
  text-align: center;
  padding: 2rem;
`;

const Title = styled.h1`
  color: #1890ff;
  margin-bottom: 2rem;
`;

const Description = styled.p`
  font-size: 16px;
  color: #666;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem 0;
  
  li {
    background: #f9f9f9;
    margin: 0.5rem 0;
    padding: 1rem;
    border-radius: 8px;
    border-left: 4px solid #1890ff;
  }
`;

function HomePage() {
  return (
    <HomeContainer>
      <Title>🏠 React 자동 라우팅 홈페이지</Title>
      <Description>
        pages 폴더에 있는 모든 .jsx 파일들이 자동으로 라우팅됩니다.
        상단 네비게이션에서 각 페이지로 이동할 수 있습니다.
      </Description>
      
      <FeatureList>
        <li>📁 <strong>자동 라우팅:</strong> pages 폴더의 파일들이 자동으로 라우트가 됩니다</li>
        <li>⚡ <strong>Lazy Loading:</strong> 페이지별로 코드 스플리팅이 적용됩니다</li>
        <li>🎨 <strong>styled-components:</strong> CSS-in-JS 스타일링이 적용됩니다</li>
        <li>📱 <strong>반응형:</strong> 모바일 친화적인 디자인입니다</li>
      </FeatureList>
      
      <Description>
        새로운 페이지를 만들려면 <code>src/pages/</code> 폴더에 
        <code>.jsx</code> 파일을 추가하기만 하면 됩니다!
      </Description>
    </HomeContainer>
  );
}

export default HomePage;