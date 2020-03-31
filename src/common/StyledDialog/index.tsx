import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import DialogTitle from './DialogTitle';
import Button from '@material-ui/core/Button';

const styles = createStyles({
  paperWidthSm: {
    maxWidth: '100%'
  },
  contentRoot: {
    padding: '0px 24px 0px'
  },
  actionRoot: {
    justifyContent: 'center'
  },
  dataGrid: {
    height: '270px'
  },
  dataGridAndError: {
    height: '250px'
  },
  titleRoot: {
    padding: '14px 14px 10px 24px',
    textAlign: 'center'
  }
});

type Props = {
  onDialogClose: () => void;
  maxWidth: any;
  title: string;
  content: any;
  inProgress?: boolean;
  onSubmit?: () => void;
} & WithStyles<typeof styles>;
const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing()
  }
}))(MuiDialogActions);

class StyledDialog extends React.Component<Props, {}> {
  render() {
    return (
      <div>
        <Dialog
          open={true}
          onClose={this.props.onDialogClose}
          aria-labelledby="form-dialog-title"
          fullWidth
          maxWidth={this.props.maxWidth}>
          <DialogTitle id="form-dialog-title" onDialogClose={this.props.onDialogClose}>
            {this.props.title}
          </DialogTitle>
          <DialogContent>{this.props.content}</DialogContent>
          {this.props.onSubmit && (
            <DialogActions>
              <Button onClick={this.props.onSubmit} disabled={this.props.inProgress} color="primary">
                Submit
              </Button>
            </DialogActions>
          )}
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(StyledDialog);
