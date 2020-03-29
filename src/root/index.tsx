import React, { Component } from 'react';
import SinglePage from '../features/singlePage'
import Login from '../features/login'
import Register from '../features/register'
import Header from '../common/header'
import { RootProps, RootState } from './types'
import { getSession, setSession } from '../Utils/utls'
import { validatClient } from '../features/login/actions'
import InActiveClient from '../common/inActiveClientWarning'
import UserSettings from '../features/Settings'

class Root extends Component<RootProps, RootState> {
    constructor(props: any) {
        super(props)
        this.state = {
            userVerified: false,
            showLogin: true,
            clientIsSuspended: false
        }
    }

    componentDidMount() {
        this.isUserValidated()
    }

    handleSwitchLogin = (login: boolean) => {
        this.setState({
            showLogin: login
        })
    }

    isUserValidated = () => {
        const userInfo: any = getSession('userInfo');
        const clientInfo: any = getSession('clientInfo');
        let userVerified = false;
        if (userInfo.length) {
            userVerified = true
        }
        this.setState({
            userVerified: userVerified,
            clientIsSuspended: clientInfo.length && !JSON.parse(clientInfo).active
        })
    }

    loggedIn = (loggedIn: boolean, clientId: string = '') => {
        this.setState({
            userVerified: loggedIn,
            showLogin: !loggedIn
        })

        if (loggedIn == true) {
            validatClient(clientId).then(response => {
                const clientInfo = response.data.successData.Payload.Data[0]
                if (!clientInfo.active) {
                    this.setState({
                        clientIsSuspended: true
                    })
                }
                setSession('clientInfo', JSON.stringify(clientInfo))
            })
        }
    }

    renderLogin = () => {
        const { showLogin } = this.state
        return showLogin ? <Login loggedin={this.loggedIn} handleSwitchLogin={this.handleSwitchLogin} /> : <Register handleSwitchLogin={this.handleSwitchLogin} />
    }

    cliearSessionAndShowLoginPage = () => {
        setSession('userInfo', '')
        setSession('clientInfo', '')
        this.setState({
            userVerified: false,
            clientIsSuspended: false,
            showLogin: true
        })
    }

    renderSuspensionMessage = () => {
        return <InActiveClient cliearSessionAndShowLoginPage={this.cliearSessionAndShowLoginPage} open={true} />
    }

    renderApplication = () => {
        return <React.Fragment>
            <Header loggedin={this.loggedIn} />
            <UserSettings />
        </React.Fragment>
    }

    renderContent = () => {
        return (!this.state.clientIsSuspended ? this.renderApplication() : this.renderSuspensionMessage())
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