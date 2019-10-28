import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 900px;
  margin: 50px auto;

  display: flex;
  flex-direction: column;
  flex: 1;

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  h1 {
    color: #fff;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 32px;
    width: 120px;
    background: #e5556e;
    font-weight: bold;
    border: 0;
    color: #fff;
    border-radius: 4px;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.09, '#E5556E')};
    }

    > strong {
      margin-left: 5px;
    }
  }

  ul {
    padding-top: 20px;
    margin-top: 10px;
  }
`;

export const Data = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 10px;
  background: rgba(0, 0, 0, 0.2);

  & + li {
    margin-top: 10px;
  }

  strong {
    flex: 1;
    color: #fff;
    margin-left: 10px;
    margin-right: 5px;
  }

  #details {
    border: 0;
    background: none;
    width: 20px;
  }

  span {
    color: #999;
    margin-right: 20px;
  }
`;

export const ActivityIndicator = styled.p`
  color: #999;
  margin-top: 30px;
  font-weight: solid;
  font-size: 20px;
`;
