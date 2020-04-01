import React from 'react';
import { fade, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import { Tooltip, ClickAwayListener } from '@material-ui/core';
import NotificationPop from './components/NotificationsPopover'
import { getNotifications } from './actions'
import { HeaderProps, HeaderState } from './types'
import HomeIcon from '@material-ui/icons/Home';
import Avatar from '@material-ui/core/Avatar'

const useStyles = createStyles((theme: Theme) => ({
    grow: {
        flexGrow: 1,
        '& > header > div': {
            paddingLeft: 'unset'
        }
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        // paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    avatar: {
        // marginRight: theme.spacing(2),
        width: 200,
        height: 120,
        position: 'absolute',
        zIndex: 100000,
    }
}),
);

class Header extends React.Component<HeaderProps, HeaderState> {
    notificaionAnchor: any = null;
    constructor(props: any) {
        super(props)
        this.state = {
            anchorEl: null,
            mobileMoreAnchorEl: null,
            openNotification: false,
            notifications: []
        }
        // this.notificaionAnchor = document.body
    }

    async componentDidMount() {
        const response: any = await getNotifications()
        this.setState({
            notifications: response.data.successData.Payload.Data
        })
    }
    handleProfileMenuOpen = (e: any) => {
        this.props.onUserInfoIconClick('userInfo')
    }

    renderUsers = () => {

    }

    handleOpenNotificaions = (e: any) => {
        this.setState({
            openNotification: true
        })
    }

    notificaionClickAway = (e: any) => {
        this.setState({
            openNotification: false
        })
    }

    renderAccountInfo = () => {

    }

    asignAnchorElement = (ref: any) => {
        this.notificaionAnchor = ref
    }

    homeIconClicked = (e: any) => {
        this.props.onUserInfoIconClick('home')
    }

    render() {
        const { classes } = this.props
        return (<div className={classes.grow}>
            <Typography className={classes.title} variant="h6" noWrap>
                <Avatar
                    alt="Raabix"
                    variant="square"
                    className={classes.avatar}
                    src="/raabix.png"
                />
            </Typography>
            <AppBar position="static">
                <Toolbar>
                    <div className={classes.grow} />
                    <div>
                        <Tooltip placement="bottom" title="Home">
                            <IconButton onClick={this.homeIconClicked} color="inherit">
                                <HomeIcon />
                            </IconButton>
                        </Tooltip>
                        {/* <Tooltip placement="bottom" title="Notifications">
                            <IconButton onClick={this.handleOpenNotificaions} ref={this.asignAnchorElement} aria-label="show 17 new notifications" color="inherit">
                                <Badge badgeContent={this.state.notifications.length} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                        </Tooltip> */}
                        <Tooltip placement="bottom" title="Account">
                            <IconButton
                                edge="end"
                                onClick={this.handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </Tooltip>
                        <Tooltip placement="bottom" title="Logout">
                            <IconButton
                                onClick={this.props.logout}
                                color="inherit"
                            >
                                <ExitToAppIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                </Toolbar>
            </AppBar>
            <NotificationPop notificaionClickAway={this.notificaionClickAway} anchorEl={this.notificaionAnchor} open={this.state.openNotification} notifications={this.state.notifications} />
        </div>
        );
    }
}

export default withStyles(useStyles)(Header)