import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { darken } from 'polished';

export const Container = styled.header`
  padding: 0 30px;
  background: rgba(0, 0, 0, 0.2);
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  max-width: 900px;
  height: 84px;

  span {
    color: #e5556e;
    font-size: 20px;
    font-weight: bold;
    margin-left: 2px;
  }
`;

export const Links = styled.div`
  display: flex;
  align-items: center;

  button {
    margin: 5px 0 0;
    height: 32px;
    width: 50px;
    margin-left: 10px;
    background: #e5556e;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 12px;
    transition: background 0.3s;

    &:hover {
      background: ${darken(0.09, '#E5556E')};
    }
  }
`;

export const Perfil = styled(Link)`
  text-decoration: none;
  transition: 50px 0;

  &:hover {
    opacity: 0.7;
  }

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #fff;
    }

    span {
      display: block;
      margin-top: 4px;
      font-size: 14px;
      color: #999;
    }
  }
`;
