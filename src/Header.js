import React from 'react';
// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */

import { css, jsx } from '@emotion/core';

const headerMain = css`
  display: flex;
  justify-content: space-around;
  text-align: center;
`;

function Header() {
  return <h1 css={headerMain}>Can I Has Memes</h1>;
}
export default Header;
