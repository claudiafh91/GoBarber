import React from 'react';
import { useSelector } from 'react-redux';

import createRoutes from './routes';
// import { Container } from './styles';

export default function app() {
  const signed = useSelector(state => state.Auth.signed);

  const Routes = createRoutes(signed);
  return <Routes />;
}
