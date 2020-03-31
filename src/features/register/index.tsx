import React from 'react';
import { Theme, createStyles, withStyles } from '@material-ui/core/styles';
import {
    Card,
    CardContent,
    Typography,
    Divider,
} from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAddOutlined';
import Page from '../../common/Page';
import RegisterForm from './RegisterForm';
import Link from '@material-ui/core/Link';
import { registerUser } from './actions'
import { newUser, Props, State } from './types'
import SuccessSnackbar from '../../root/SuccessSnackbar';
const useStyles = createStyles((theme: Theme) => ({
    root: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(6, 2)
    },
    card: {
        width: 500,
        maxWidth: '100%',
        overflow: 'visible',
        display: 'flex',
        position: 'relative',
        '& > *': {
            flexGrow: 1,
            flexBasis: '50%',
            width: '50%'
        }
    },
    content: {
        padding: theme.spacing(8, 4, 3, 4)
    },
    media: {
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        padding: theme.spacing(3),
        color: theme.palette.common.white,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        [theme.breakpoints.down('md')]: {
            display: 'none'
        }
    },
    icon: {
        color: theme.palette.common.white,
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(1),
        position: 'absolute',
        top: -32,
        left: theme.spacing(3),
        height: 64,
        width: 64,
        fontSize: 32
    },
    registerForm: {
        marginTop: theme.spacing(3)
    },
    divider: {
        margin: theme.spacing(2, 0)
    },
    person: {
        marginTop: theme.spacing(2),
        display: 'flex'
    },
    avatar: {
        marginRight: theme.spacing(2)
    }
}));

class Register extends React.Component<Props, State> {
    constructor(props: any) {
        super(props)
        this.state = {
            openSnackbar: false,
            error: false
        }
    }

    handleSnackbarClose = () => {
        this.setState({
            openSnackbar: false
        })
    };
    onFormSubmit = async (newUser: newUser) => {
        const response = await registerUser(newUser)
        if (response.successData.Success) {
            this.setState({
                openSnackbar: true,
                error: false
            })
        } else {
            this.setState({
                openSnackbar: true,
                error: true
            })
        }
    }

    preventDefault = (event: React.SyntheticEvent) => {
        this.props.handleSwitchLogin(true)
        event.preventDefault()
    };
    render() {
        const { classes } = this.props;
        return (
            <Page
                className={classes.root}
                title="Register"
            >
                <Card className={classes.card}>
                    <CardContent className={classes.content}>
                        <PersonAddIcon className={classes.icon} />
                        <Typography
                            gutterBottom
                            variant="h3"
                        >
                            Sign up
                    </Typography>
                        <Typography variant="subtitle2">
                            Sign up on the internal platform
                    </Typography>
                        <RegisterForm className={classes.registerForm} onFormSubmit={this.onFormSubmit} />
                        <Divider className={classes.divider} />
                        <div style={{ width: '100%', textAlign: 'center', paddingTop: 10 }}>
                            <Link href="#" onClick={this.preventDefault}>
                                Login
                        </Link>
                        </div>
                    </CardContent>
                </Card>
                <SuccessSnackbar
                    onClose={this.handleSnackbarClose}
                    open={this.state.openSnackbar}
                    error={this.state.error}
                />
            </Page>
        );
    }
}

export default withStyles(useStyles)(Register);
