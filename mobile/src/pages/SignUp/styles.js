import styled from 'styled-components/native';
import Input from '~/components/input';
import Button from '~/components/button';

export const Container = styled.View`
  flex: 1;
  padding: 0 30px;
  align-items: center;
  justify-content: center;
`;

export const Form = styled.KeyboardAvoidingView.attrs({
  behavior: 'padding',
})`
  align-self: stretch;
  margin-top: 50px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;

export const SignLink = styled.TouchableOpacity`
  margin-top: 20px;
`;

export const SignLinkText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;
