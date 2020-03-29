import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Snackbar, SnackbarContent, colors } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircleOutlined';
import { SnackBarProps } from '../types'
const useStyles = makeStyles((theme) => ({
  content: {
    backgroundColor: colors.green[600]
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
      autoHideDuration={6000}
      onClose={onClose}
      open={open}
    >
      <SnackbarContent
        className={classes.content}
        message={(
          <span className={classes.message}>
            <CheckCircleIcon className={classes.icon} />
            Successfully saved changes!
          </span>
        )}
        variant="outlined"
      />
    </Snackbar>
  );
}

export default SuccessSnackbar;
