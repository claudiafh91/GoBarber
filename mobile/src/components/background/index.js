import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

export const Background = styled(LinearGradient).attrs({
  colors: ['#22202c', '#3b2740'],
})`
  flex: 1;
`;

export const Header = styled.View`
  align-items: center;
  justify-content: center;
  padding: 30px;
  background: rgba(0, 0, 0, 0.5);
  height: 80px;
`;
