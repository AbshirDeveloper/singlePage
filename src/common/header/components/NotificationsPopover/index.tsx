import React from 'react';
import { createStyles, withStyles } from '@material-ui/styles';
import {
  Popover,
  CardHeader,
  CardActions,
  Divider,
  Button,
  colors
} from '@material-ui/core';
import NotificationList from './NotificationList';
import Placeholder from './Placeholder';
import { ClickAwayListener } from '@material-ui/core';

const useStyles = createStyles(() => ({
  root: {
    width: 550,
    maxWidth: '100%'
  },
  actions: {
    backgroundColor: colors.grey[50],
    justifyContent: 'center'
  }
}));

class NotificationsPopover extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {

    }
  }

  render() {
    const { notifications = [], anchorEl, open, classes } = this.props
    return (
      <Popover
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
      >
        <ClickAwayListener onClickAway={this.props.notificaionClickAway}>
          <div className={classes.root}>
            <CardHeader title="Notifications" />
            <Divider />
            {notifications.length > 0 ? (
              <NotificationList notifications={notifications} />
            ) : (
                <Placeholder />
              )}
            <Divider />
            <CardActions className={classes.actions}>
              <Button
                // component={RouterLink}
                size="small"
              // to="#"
              >
                See all
            </Button>
            </CardActions>
          </div>
        </ClickAwayListener>
      </Popover>
    );
  }
}

export default withStyles(useStyles)(NotificationsPopover);
