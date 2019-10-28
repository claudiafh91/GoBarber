import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  margin: 50px auto;

  form {
    display: flex;
    flex-direction: column;
    max-width: 900px;

    input {
      width: 900px;
    }

    span {
      color: #fb0606;
      margin: 0 0 10px;
      font-weight: bold;
    }

    hr {
      border: 0;
      height: 2px;
      background: rgba(255, 255, 255, 0.1);
      margin: 10px 0 20px;
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;

      height: 40px;
      width: 15%;
      align-self: flex-end;
      background: #e5556e;
      font-weight: bold;
      transition: background 0.3s;

      &:hover {
        background: ${darken(0.09, '#E5556E')};
      }

      > strong {
        margin-left: 5px;
      }
    }
  }
`;
