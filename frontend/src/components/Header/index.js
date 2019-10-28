import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Container, Content, Links, Perfil } from './styles';
import Logo from '~/assets/logo.svg';
import { signOut } from '~/store/modules/authentication/actions';

export default function Header() {
  const dispatch = useDispatch();

  const { name } = useSelector(state => state.User.profile);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <Link to="/dashboard">
          <img src={Logo} alt="Logo Meetapp" />
          <span>eetapp</span>
        </Link>

        <Links>
          <Perfil to="/profile">
            <div>
              <strong>{name}</strong>
              <span>Meu perfil</span>
            </div>
          </Perfil>
          <button type="button" onClick={handleSignOut}>
            Sair
          </button>
        </Links>
      </Content>
    </Container>
  );
}
