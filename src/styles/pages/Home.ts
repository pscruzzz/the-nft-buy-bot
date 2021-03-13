import styled from 'styled-components'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h1 {
    margin-bottom: 2rem;
    color: ${props => props.theme.colors.text};
    text-align: center;
  }

  h3 {
    color: ${props => props.theme.colors.text};
    text-align: center;
  }
`
