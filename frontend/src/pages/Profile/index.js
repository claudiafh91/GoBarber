import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';
import { MdAddCircleOutline } from 'react-icons/md';
import * as Yup from 'yup';

import { Container } from './styles';

import { updateProfileRequest } from '~/store/modules/users/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  oldPassword: Yup.string(),
  password: Yup.string().when('oldPassword', (oldPassword, field) =>
    oldPassword
      ? field
          .min(8, 'No mínimo 8 caracteres')
          .required('Especifique a nova senha')
      : field
  ),
  confirmPassword: Yup.string().when('password', (password, field) =>
    password
      ? field
          .oneOf([Yup.ref('password')], 'Confirme a nova senha')
          .required('Confirme a nova senha')
      : field
  ),
});

export default function Profile() {
  const dispatch = useDispatch();

  const { profile, loading } = useSelector(state => state.User);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  return (
    <Container>
      <Form initialData={profile} schema={schema} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Digite seu nome completo" />
        <Input name="email" type="email" placeholder="Digite seu e-mail" />
        <hr />
        <Input name="oldPassword" type="password" placeholder="Senha actual" />
        <Input name="password" type="password" placeholder="Nova senha" />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirmação de senha"
        />
        <button type="submit">
          {loading ? (
            <strong>Salvando...</strong>
          ) : (
            <>
              <MdAddCircleOutline size="20" color="#fff" />
              <strong>Salvar perfil</strong>
            </>
          )}
        </button>
      </Form>
    </Container>
  );
}
