import styled from 'styled-components';

export const Container = styled.div`
  align-items: center;

  background: rgba(0, 0, 0, 0.5);
  border: 0;
  border-radius: 4px;
  width: 900px;
  height: 200px;
  color: #999;
  margin: 0 0 10px;

  label {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      opacity: 0.7;
    }

    img {
      max-width: 900px;
      max-height: 200px;
    }

    input {
      display: none;
    }
  }
`;

export const SelectImage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 80px auto;

  &:hover {
    opacity: 0.7;
  }
`;
