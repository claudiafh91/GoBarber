import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Contents } from './styles';

export default function AuthLayout({ children }) {
  return (
    <Wrapper>
      <Contents>{children}</Contents>
    </Wrapper>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
