import React, { Component } from 'react';
import SinglePage from '../features/singlePage'
import Login from '../features/login'
import Register from '../features/register'
import Header from '../common/header'
import { RootProps, RootState } from './types'

class Root extends Component<RootProps, RootState> {
    constructor(props: any) {
        super(props)
        this.state = {
            userVerified: false,
            showLogin: true
        }
    }

    handleSwitchLogin = (login: boolean) => {
        this.setState({
            showLogin: login
        })
    }

    renderLogin = () => {
        const { showLogin } = this.state
        return showLogin ? <Login handleSwitchLogin={this.handleSwitchLogin} /> : <Register handleSwitchLogin={this.handleSwitchLogin} />
    }

    renderContent = () => {
        return <React.Fragment>
            <Header />
            <SinglePage />
        </React.Fragment>
    }

    render() {
        const { userVerified } = this.state
        return (
            <div>
                {userVerified ? this.renderContent() : this.renderLogin()}
            </div>
        );
    }
}

export default Root;