
import React from 'react';
import { Props, State } from './types'
import {
    Card,
    CardContent,
    Typography,
    Divider,
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import { Theme, createStyles, withStyles } from '@material-ui/core/styles';
import Page from '../../common/Page';
import LoginForm from './LoginForm';

const useStyles = createStyles((theme: Theme) => ({
    root: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(6, 2)
    },
    card: {
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
    loginForm: {
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

class Login extends React.Component<Props, State> {


    render() {
        const { classes } = this.props
        return (
            <Page
                className={classes.root}
                title="Login"
            >
                <Card className={classes.card}>
                    <CardContent className={classes.content}>
                        <LockIcon className={classes.icon} />
                        <Typography
                            gutterBottom
                            variant="h3"
                        >
                            Sign in
                        </Typography>
                        <Typography variant="subtitle2">
                            Sign in on the internal platform
                        </Typography>
                        <LoginForm className={classes.loginForm} />
                        <Divider className={classes.divider} />
                    </CardContent>
                </Card>
            </Page>
        );
    }
}

export default withStyles(useStyles)(Login);
