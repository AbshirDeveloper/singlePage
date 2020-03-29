import React, { Component } from 'react';
import { Link } from '@material-ui/core';
import { setSession } from '../../Utils/utls'
import { Props } from './types'
import Headers from './header'
class Header extends Component<Props> {
    logout = () => {
        setSession('userInfo', '');
        this.props.loggedin(false)
    }
    render() {
        return (
            <div>
                <Headers logout={this.logout} />
            </div>
        );
    }
}

export default Header;