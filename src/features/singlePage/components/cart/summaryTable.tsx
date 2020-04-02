import React from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: 200,
            },
        },
    }),
);

export default function ValidationTextFields() {
    const classes = useStyles();

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <TextField id="standard-search" label="Search field" type="search" />
                <TextField id="standard-search" label="Search field" type="search" />
                <TextField id="standard-search" label="Search field" type="search" />
                <TextField id="standard-search" label="Search field" type="search" />
            </div>
        </form>
    );
}