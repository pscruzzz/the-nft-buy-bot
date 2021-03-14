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
  height: 40%;
  width: 40%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 5px 5px 15px 2px rgba(89, 80, 79, 0.1),
    -3px -3px 4px 1px rgba(250, 237, 233, 1),
    -8px -8px 10px 1px rgba(242, 237, 233, 0.7);
  border-radius: 5rem;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 30%;
    width: 100%;

    h1 {
      font-weight: 500;
      color: ${props => props.theme.colors.background};
      letter-spacing: 0.5rem;
      text-shadow: 3px 3px 3px rgba(0, 0, 0, 0.1),
        -3px -3px 3px rgba(255, 255, 255, 0.2),
        -3px -3px 8px rgba(255, 255, 255, 0.2);
    }
  }

  h3 {
    color: rgba(86, 66, 61, 0.2);
    text-align: center;
    margin-bottom: 1rem;
  }

  input {
    outline: none;
    border: none;
    box-shadow: 5px 5px 7px 1px rgba(89, 80, 79, 0.1) inset,
      -5px -5px 7px 0 rgba(247, 246, 245, 0.5) inset;
    width: 60%;
    height: 50%;
    margin-top: 4rem;
    background: ${props => props.theme.colors.background};
    border-radius: 5rem;
    font: 200 2rem 'Montserrat', sans-serif;
    text-align: center;

    ::placeholder {
      font: 300 2rem 'Montserrat', sans-serif;
      text-align: center;
      color: rgba(86, 66, 61, 0.5);
    }

    :focus {
      padding-bottom: 0rem;
      ::placeholder {
        color: transparent;
      }
    }
  }

  input[type='password'] {
    padding-bottom: 1rem;
    font-size: 3.5rem;
    font-weight: 500;
    :not(:placeholder-shown) {
      padding-bottom: 0rem;
    }
    :focus {
      padding-bottom: 0rem;
      ::placeholder {
        color: transparent;
      }
    }
  }
`
