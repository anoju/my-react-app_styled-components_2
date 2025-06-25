import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.6;
    color: #333;
    background-color: #f0f2f5;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
    background: #f1f3f4;
    padding: 2px 4px;
    border-radius: 4px;
    font-size: 0.9em;
  }

  button {
    border: none;
    outline: none;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul, ol {
    list-style: none;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.2;
  }

  input, textarea, select {
    font-family: inherit;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    padding: 8px 12px;
    transition: border-color 0.2s;
    
    &:focus {
      border-color: #1890ff;
      outline: none;
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    }
  }

  /* Ant Design 기본 스타일과 조화 */
  .ant-picker {
    border-radius: 6px;
  }
`;

export default GlobalStyle;