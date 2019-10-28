import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Nav = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  padding: 0 30px;
  align-items: center;
  justify-content: center;
`;

export const DateText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #fff;
`;

export const List = styled.FlatList.attrs({
  showVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})``;
