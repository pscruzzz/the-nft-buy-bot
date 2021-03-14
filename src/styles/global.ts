import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html{
    font-size: 62.5%;
    @media (max-width: 556px) {
      font-size: 55%;
    }
    @media (max-width: 390px) {
      font-size: 50%;
    }
    @media (max-width: 350px) {
      font-size: 40%;
    }
  }

  body {
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    font: 400 2rem 'Montserrat Alternates', sans-serif;
  }

  h1{
    font-size: 6rem
  }

  h2{
    font-size: 5rem
  }

  h3{
    font-size: 4rem
  }

  button{
    cursor: pointer;
  }

`
