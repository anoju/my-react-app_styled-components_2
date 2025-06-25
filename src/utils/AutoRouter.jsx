import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { styled } from 'styled-components';

// 페이지 컴포넌트들을 직접 import
import HomePage from '../pages/index.jsx';
import CustomWeekPickerPage from '../pages/customWeekPicker.jsx';

const Navigation = styled.nav`
  background: #f5f5f5;
  padding: 1rem;
  margin-bottom: 2rem;
  border-radius: 8px;
  
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
  
  li {
    margin: 0;
  }
  
  a {
    padding: 0.5rem 1rem;
    background: white;
    color: #333;
    text-decoration: none;
    border-radius: 4px;
    border: 1px solid #ddd;
    transition: all 0.2s;
    
    &:hover {
      background: #e6f7ff;
      border-color: #1890ff;
    }
    
    &.active {
      background: #1890ff;
      color: white;
      border-color: #1890ff;
    }
  }
`;

const PageContainer = styled.div`
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  min-height: 400px;
`;

const DebugPanel = styled.div`
  background: #f0f0f0;
  padding: 10px;
  margin-bottom: 1rem;
  border-radius: 4px;
  font-size: 12px;
  color: #666;
`;

function AutoRouter() {
  const location = useLocation();
  
  console.log('AutoRouter 렌더링, 현재 경로:', location.pathname);
  
  const routes = [
    {
      path: '/',
      name: '홈',
      component: HomePage
    },
    {
      path: '/customWeekPicker',
      name: 'WeekPicker 테스트',
      component: CustomWeekPickerPage
    }
  ];

  return (
    <div>
      <Navigation>
        <ul>
          {routes.map(route => {
            const isActive = location.pathname === route.path;
            console.log(`라우트 ${route.path}: ${isActive ? 'active' : 'inactive'}`);
            
            return (
              <li key={route.path}>
                <Link 
                  to={route.path}
                  className={isActive ? 'active' : ''}
                  onClick={() => console.log(`${route.name} 링크 클릭됨`)}
                >
                  {route.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </Navigation>

      <DebugPanel>
        <strong>현재 경로:</strong> {location.pathname} | 
        <strong> 매칭된 라우트:</strong> {routes.find(r => r.path === location.pathname)?.name || '없음'}
      </DebugPanel>

      <PageContainer>
        <Routes>
          {routes.map(route => {
            const Component = route.component;
            console.log(`라우트 등록: ${route.path} -> ${Component.name}`);
            
            return (
              <Route 
                key={route.path} 
                path={route.path} 
                element={
                  <div>
                    <div style={{ marginBottom: '10px', fontSize: '12px', color: '#999' }}>
                      현재 페이지: {route.name}
                    </div>
                    <Component />
                  </div>
                } 
              />
            );
          })}
          <Route 
            path="*" 
            element={
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <h2>404 - 페이지를 찾을 수 없습니다</h2>
                <p>요청하신 페이지가 존재하지 않습니다.</p>
                <p>현재 경로: <code>{location.pathname}</code></p>
                <Link to="/" style={{ color: '#1890ff' }}>홈으로 돌아가기</Link>
              </div>
            } 
          />
        </Routes>
      </PageContainer>
    </div>
  );
}

export default AutoRouter;