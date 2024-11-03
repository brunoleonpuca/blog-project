// src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';
  
export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${props => props.theme.typography.platform.content};
    color: ${props => props.theme.colors.text};
    background-color: ${props => props.theme.colors.background};
    line-height: 1.5;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.typography.platform.title};
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;