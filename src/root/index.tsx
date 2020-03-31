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
            clientIsSuspended: false,
            renderUserInfo: false
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
        let userIsActive = false;
        if (userInfo && Object.keys(userInfo).length) {
            userVerified = true
            userIsActive = userInfo.active
        }
        let clientSupspended = clientInfo && clientInfo.active && userIsActive
        this.setState({
            userVerified: userVerified,
            clientIsSuspended: !clientSupspended
        })
    }

    loggedIn = (loggedIn: boolean, clientId: string = '') => {
        this.setState({
            userVerified: loggedIn,
            showLogin: !loggedIn
        })
        const userInfo: any = getSession('userInfo');

        if (loggedIn == true) {
            validatClient(clientId).then(response => {
                const clientInfo = response.data.successData.Payload.Data[0]
                // if (!clientInfo.active) {
                this.setState({
                    clientIsSuspended: !(clientInfo.active && userInfo.active)
                })
                // }
                setSession('clientInfo', clientInfo)
            })
            // this.isUserValidated()
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

    onUserInfoIconClick = (iconClickd: string) => {
        const viewToRender = iconClickd === 'userInfo' ? true : false
        this.setState({
            renderUserInfo: viewToRender
        })
    }

    renderApplication = () => {
        return <React.Fragment>
            <Header onUserInfoIconClick={this.onUserInfoIconClick} loggedin={this.loggedIn} />
            {this.state.renderUserInfo ? <UserSettings /> : <SinglePage />}
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