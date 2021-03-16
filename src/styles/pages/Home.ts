import styled, { keyframes } from 'styled-components'
import theme from '../theme'

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
  max-width: 1440px;

  .logo {
    width: 95%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .nft,
  .bot {
    width: 45%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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

  .panels {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 95%;
  }
`

export const StyledDiv = styled.div`
  width: 92%;
  height: 10rem;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin: 4rem 0rem;

  div {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    h4 {
      color: rgba(86, 66, 61, 0.3);
      margin-left: 1.8rem;
      margin-bottom: 0.5rem;
    }

    input {
      outline: none;
      border: none;
      box-shadow: 3px 3px 5px 1px rgba(89, 80, 79, 0.1) inset,
        -5px -5px 7px 0 rgba(247, 246, 245, 0.5) inset;
      width: 100%;
      height: 50%;
      background: ${props => props.theme.colors.background};
      border-radius: 5rem;
      font: 200 2rem 'Montserrat', sans-serif;
      text-align: left;
      padding-left: 1.8rem;

      ::placeholder {
        font: 300 2rem 'Montserrat', sans-serif;
        text-align: left;
        color: rgba(86, 66, 61, 0.5);
      }
    }
  }

  .waitUntilDivClass {
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;

    input {
      text-align: center;
      padding-left: 0rem;
      ::placeholder {
        text-align: center;
      }
    }
  }

  .outerShadow {
    width: 20%;
    height: 50%;
    box-shadow: 5px 5px 5px 1px rgba(89, 80, 79, 0.1),
      -5px -5px 7px 0 rgba(247, 246, 245, 0.5);
    border-radius: 5rem;
    -webkit-transition: box-shadow 0.5s ease;
    -moz-transition: box-shadow 0.5s ease;
    -ms-transition: box-shadow 0.5s ease;
    -o-transition: box-shadow 0.5s ease;
    transition: box-shadow 0.5s ease;

    :hover {
      box-shadow: 0px 0px rgba(89, 80, 79, 0);
    }
  }

  button {
    width: 100%;
    height: 100%;
    border-radius: 5rem;
    outline: none;
    border: none;

    background: ${props => props.theme.colors.background};

    font: 300 2rem 'Montserrat', sans-serif;
    text-align: center;
    color: rgba(86, 66, 61, 1);
    box-shadow: 0px 0px rgba(89, 80, 79, 0);

    -webkit-transition: box-shadow 0.25s ease;
    -moz-transition: box-shadow 0.25s ease;
    -ms-transition: box-shadow 0.25s ease;
    -o-transition: box-shadow 0.25s ease;
    transition: box-shadow 0.25s ease;

    :hover {
      box-shadow: 5px 5px 5px 0px rgba(89, 80, 79, 0.1) inset,
        -5px -5px 7px 0 rgba(247, 246, 245, 0.5) inset;
    }
  }
`

export const CurrentQuery = styled.div`
  width: 45%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  h2 {
    /* height: 100%; */
    transform: rotateY(-180deg);
    -webkit-transform: rotate(-180deg);
    text-align: center;
    writing-mode: vertical-rl;
    color: #000;
    color: rgba(86, 66, 61, 0.2);
  }
`

export const HistoryLogs = styled.div`
  width: 45%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  h2 {
    /* height: 100%; */
    transform: rotateY(-180deg);
    -webkit-transform: rotate(-180deg);
    text-align: center;
    writing-mode: vertical-rl;
    color: #000;
    color: rgba(86, 66, 61, 0.2);
  }
`
