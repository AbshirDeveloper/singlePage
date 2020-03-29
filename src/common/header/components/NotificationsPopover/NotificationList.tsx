import React from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import PaymentIcon from '@material-ui/icons/Payment';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import CodeIcon from '@material-ui/icons/Code';
import StoreIcon from '@material-ui/icons/Store';
import gradients from '../../../../Utils/gradients';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {},
  listItem: {
    '&:hover': {
      backgroundColor: theme.palette.background.default
    }
  },
  avatarBlue: {
    backgroundImage: gradients.blue
  },
  avatarGreen: {
    backgroundImage: gradients.green
  },
  avatarOrange: {
    backgroundImage: gradients.orange
  },
  avatarIndigo: {
    backgroundImage: gradients.indigo
  },
  arrowForwardIcon: {
    // color: theme.palette.icon
  }
}));

function NotificationList(props: any) {
  const { notifications, className, ...rest } = props
  const classes = useStyles();

  const avatars: any = {
    order: (
      <Avatar className={classes.avatarBlue}>
        <PaymentIcon />
      </Avatar>
    ),
    user: (
      <Avatar className={classes.avatarOrange}>
        <PeopleIcon />
      </Avatar>
    ),
    project: (
      <Avatar className={classes.avatarGreen}>
        <StoreIcon />
      </Avatar>
    ),
    feature: (
      <Avatar className={classes.avatarIndigo}>
        <CodeIcon />
      </Avatar>
    )
  };

  return (
    <List
      className={clsx(classes.root, className)}
      disablePadding
    >
      {notifications.map((notification: any, i: any) => (
        <ListItem
          className={classes.listItem}
          divider={i < notifications.length - 1}
          key={notification.id}
        >
          <ListItemAvatar>{avatars[notification.type]}</ListItemAvatar>
          <ListItemText
            primary={`${notification.title} (${notification.created_by})`}
            primaryTypographyProps={{ variant: 'body1' }}
            secondary={moment(notification.created_at).fromNow()}
          />
          <ArrowForwardIcon className={classes.arrowForwardIcon} />
        </ListItem>
      ))}
    </List>
  );
}

export default NotificationList;
