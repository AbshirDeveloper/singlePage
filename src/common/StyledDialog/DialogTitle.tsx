import React from 'react';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import MuiDialogTitle, { DialogTitleProps } from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      margin: 0,
      padding: theme.spacing(2)
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(),
      top: theme.spacing(),
      color: theme.palette.grey[500]
    }
  });

type StyledDialogTitleProps = {
  onDialogClose: () => void;
} & DialogTitleProps &
  WithStyles<typeof styles>;

const DialogTitle = (props: StyledDialogTitleProps) => {
  const { children, classes, onDialogClose } = props;

  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onDialogClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onDialogClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};

export default withStyles(styles)(DialogTitle);
