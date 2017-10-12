import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Logo from './logo.png';
import messages from './messages';

// <HeaderLink to="/ocr">
//   <FormattedMessage {...messages.ocr} />
// </HeaderLink>
class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <A href="https://twitter.com/mxstbr">
          <Img src={Logo} alt="riskgenius - Logo" />
        </A>
        <NavBar>
          <HeaderLink to="/">
            <FormattedMessage {...messages.home} />
          </HeaderLink>
          <HeaderLink to="/Johannes">
            <FormattedMessage {...messages.johannes} />
          </HeaderLink>
        </NavBar>
      </div>
    );
  }
}

export default Header;
