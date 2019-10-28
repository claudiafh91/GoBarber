import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: linear-gradient(180deg, #22202c, #3b2740);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Contents = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    button {
      margin: 5px 0 0;
      height: 44px;
      background: #e5556e;
      font-size: 16px;
      transition: background 0.3s;

      &:hover {
        background: ${darken(0.09, '#E5556E')};
      }
    }

    span {
      color: #fb0606;
      margin: 0 0 5px;
      font-weight: bold;
    }

    a {
      color: #fff;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }
`;
