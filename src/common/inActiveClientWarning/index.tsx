import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import ErrorIcon from '@material-ui/icons/Error';
import { Link } from '@material-ui/core';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            textAlign: 'center',
            fontSize: 20
        },
    }),
);

export default function SimpleModal(props: any) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        if (props.open !== undefined) {
            setOpen(props.open)
        }
    })

    return (
        <div>
            <Modal
                open={open}
                disablePortal
                disableEnforceFocus
                disableAutoFocus
            >
                <div style={modalStyle} className={classes.paper}>
                    <ErrorIcon fontSize="inherit" color="error" />
                    <p id="simple-modal-description">
                        You are suspended
                        <br />
                        <Link style={{ fontSize: 15 }} onClick={props.cliearSessionAndShowLoginPage}>
                            Login with different account
                        </Link>
                    </p>
                    <SimpleModal />
                </div>
            </Modal>
        </div>
    );
}