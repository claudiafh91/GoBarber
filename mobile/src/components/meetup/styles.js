import styled from 'styled-components/native';
import Button from '~/components/button';

export const Container = styled.View`
  flex: 1;
  background: #fff;
  border-radius: 4px;
  margin-bottom: 20;

  display: flex;
  flex-direction: column;
`;

export const Banner = styled.Image`
  flex: 1;
  border-radius: 4px;
  width: 300px;
  height: 150px;
`;

export const Info = styled.View`
  margin: 15px;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 18px;
  margin: 10px 0;
  color: #333;
`;

export const Description = styled.Text`
  font-size: 14px;
  margin-left: 5px;
  color: #999;
`;

export const Data = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin: 5px 0;
`;

export const DataText = styled.Text`
  color: #999;
  font-size: 14px;
  margin-left: 5px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;
