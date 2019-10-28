import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  margin: 30px auto;

  form {
    display: flex;
    flex-direction: column;
    max-width: 900px;

    input {
      width: 900px;
    }

    textarea {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      width: 900px;
      padding: 15px 15px;
      color: #fff;
      margin: 0 0 10px;
      resize: none;

      &::placeholder {
        color: rgba(255, 255, 255, 0.3);
      }
    }

    > button {
      display: flex;
      align-items: center;
      justify-content: center;

      height: 40px;
      width: 15%;
      align-self: flex-end;
      background: #e5556e;
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
