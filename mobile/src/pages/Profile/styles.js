import styled from 'styled-components/native';
import Input from '~/components/input';
import Button from '~/components/button';

export const Container = styled.View`
  flex: 1;
  padding: 0 30px;
  align-items: center;
  justify-content: center;
`;

export const Separator = styled.View`
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin: 20px 0 30px;
`;

export const Form = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyler: { padding: 30 },
})`
  align-self: stretch;
  margin-top: 30px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;

export const LogoutButton = styled(Button)`
  margin-top: 10px;
  background: #fe0c0c;
`;
