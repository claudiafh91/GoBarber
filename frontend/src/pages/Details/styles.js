import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px auto;
  max-width: 900px;
  min-width: 900px;

  h1 {
    color: #fff;
  }

  p {
    color: #fff;
    margin: 20px 0 20px;
    line-height: 25px;
  }

  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;

    > div {
      display: flex;
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 5px;

      height: 30px;
      width: 100px;

      > strong {
        margin-left: 5px;
      }
    }

    #cancel {
      margin-left: 10px;
      background: #e5556e;
      transition: background 0.3s;

      &:hover {
        background: ${darken(0.09, '#E5556E')};
      }
    }

    #edit {
      background: #4dbaf9;
      transition: background 0.3s;

      &:hover {
        background: ${darken(0.09, '#4DBAF9')};
      }
    }
  }

  img {
    max-width: 900px;
    max-height: 300px;
  }
`;

export const Datetime = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  > div {
    display: flex;
    align-items: center;
    margin-right: 30px;

    p {
      margin-left: 5px;
      color: #999;
    }
  }
`;
