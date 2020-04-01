import React, { Component } from 'react';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import { NavigationProps, NavigationState } from '../types'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import WebAssetIcon from '@material-ui/icons/WebAsset';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const drawerWidth = 200;

const useStyles = createStyles((theme: Theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        height: '90%',
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        paddingTop: 84
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    // necessary for content to be below app bar
    toolbar: {
        ...theme.mixins.toolbar,
        fontSize: 'x-large',
        textAlign: 'center',
        fontFamily: 'cursive',
        lineHeight: 'normal',
        fontStyle: 'oblique',
        paddingTop: 40
    },
}),
);

const icons = {
    cart: <ShoppingCartIcon />,
    asset: <WebAssetIcon />,
    liable: <AssessmentIcon />,
    balance: <AccountBalanceIcon />
}

class Navigations extends Component<NavigationProps, NavigationState> {
    constructor(props: any) {
        super(props)
        this.state = {
            activeTab: '',
            activeView: {}
        }
    }

    componentDidMount() {
        setTimeout(() => {
            let tab: any = "";
            Object.keys(this.props.default).forEach(item => {
                if (this.props.default[item]) {
                    tab = item
                }
            })
            this.setState({
                activeTab: tab
            })
        }, 0)
    }

    navigationClicked = (tab: string) => {
        this.setState({
            activeTab: tab
        })
        this.props.handleChangeMainView(tab)
    }
    render() {
        const { classes } = this.props
        return (
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.toolbar}>
                    Company Name
                </div>
                <List>
                    {this.props.pages.map((page, index) => (
                        <ListItem style={{ backgroundColor: this.state.activeTab === page.name ? 'rgb(164, 190, 249)' : '' }} onClick={() => this.navigationClicked(page.name)} button key={page.name} onMouseEnter={(event: any) => {
                            this.setState({
                                activeView: {
                                    [page.name]: true
                                }
                            })
                        }} onMouseLeave={(event: any) => {
                            this.setState({
                                activeView: {
                                    [page.name]: false
                                }
                            })
                        }}>
                            <ListItemIcon>{icons[page.icon]}</ListItemIcon>
                            <ListItemText primary={page.name} />
                            {this.props.default[page.name] || this.state.activeView[page.name] ? <StarBorderIcon onClick={() => this.props.makePageDefault(page.name)} fontSize="small" color="primary" /> : ''}
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        );
    }
}

export default withStyles(useStyles)(Navigations);