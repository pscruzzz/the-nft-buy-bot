import styled from 'styled-components'

// box-shadow: [horizontal offset] [vertical offset] [blur radius] [optional spread radius] [color];

export const Container = styled.div`
  background: ${props => props.theme.colors.background};
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const Card = styled.div`
  background: ${props => props.theme.colors.background};
  height: 50%;
  width: 50%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 5px 5px 15px 2px rgba(89, 80, 79, 0.1),
    -3px -3px 4px 1px rgba(250, 237, 233, 1),
    -8px -8px 10px 1px rgba(242, 237, 233, 0.7);
  border-radius: 5rem;

  h1 {
    margin-bottom: 2rem;
    color: ${props => props.theme.colors.text};
    text-align: center;
  }

  h3 {
    color: ${props => props.theme.colors.text};
    text-align: center;
  }

  input {
    outline: none;
    border: none;
    box-shadow: 5px 5px 7px 1px rgba(89, 80, 79, 0.1) inset,
      -5px -5px 7px 0 rgba(247, 246, 245, 0.5) inset;
    width: 60%;
    height: 15%;
    margin-top: 4rem;
    background: ${props => props.theme.colors.background};
    border-radius: 5rem;
    font: 200 2rem 'Montserrat', sans-serif;
    text-align: center;

    ::placeholder {
      font: 300 2rem 'Montserrat', sans-serif;
      text-align: center;
    }
  }
`
