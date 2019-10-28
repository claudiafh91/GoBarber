import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import Logo from '~/assets/logo.svg';

import { signUpRequests } from '~/store/modules/authentication/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string()
    .min(8, 'No mínimo 8 caracteres')
    .required('A senha é obrigatória'),
});

export default function SignUp() {
  const dispatch = useDispatch();

  console.tron.log('signup');

  const loading = useSelector(state => state.Auth.loading);

  function handleSubmit(data) {
    const { name, email, password } = data;

    console.tron.log('signup1');

    dispatch(signUpRequests(name, email, password));
  }

  return (
    <>
      <img src={Logo} alt="Logo Meetapp" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Digite seu nome completo" />
        <Input name="email" type="email" placeholder="Digite seu e-mail" />
        <Input
          name="password"
          type="password"
          placeholder="Digite seu senha secreta"
        />
        <button type="submit">
          {loading ? 'Cadastrando...' : 'Criar conta'}
        </button>
        <Link to="/">Já tenho login</Link>
      </Form>
    </>
  );
}
