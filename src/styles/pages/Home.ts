import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
export const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .logo {
    width: 100vw;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .nft,
  .bot {
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }

  .letter {
    text-align: center;
    font-weight: 500;
    font-size: 20rem;
    color: ${props => props.theme.colors.background};
    text-shadow: 3px 3px 3px rgba(0, 0, 0, 0.1),
      -3px -3px 3px rgba(255, 255, 255, 0.2),
      -3px -3px 8px rgba(255, 255, 255, 0.2);
    /* margin-right: -9vw */
    /* text-align: right; */
  }
`
