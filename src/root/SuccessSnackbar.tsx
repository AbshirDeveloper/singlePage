import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Snackbar, SnackbarContent, colors } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircleOutlined';
import ErrorIcon from '@material-ui/icons/Error';
import { SnackBarProps } from '../features/Settings/types'
const useStyles = makeStyles((theme) => ({
  success: {
    backgroundColor: colors.green[600]
  },
  error: {
    backgroundColor: colors.red[600]
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    marginRight: theme.spacing(2)
  }
}));

function SuccessSnackbar(props: SnackBarProps) {
  const { open, onClose } = props
  const classes = useStyles();

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      color={props.error ? 'error' : 'primary'}
      autoHideDuration={6000}
      onClose={onClose}
      open={open}
    >
      <SnackbarContent
        className={props.error ? classes.error : classes.success}
        message={(
          <span className={classes.message}>
            {props.error ? <ErrorIcon className={classes.icon} /> : <CheckCircleIcon className={classes.icon} />}
            {props.error ? 'An error has occured' : 'Successfully saved changes!'}
          </span>
        )}
        variant="outlined"
      />
    </Snackbar>
  );
}

export default SuccessSnackbar;
