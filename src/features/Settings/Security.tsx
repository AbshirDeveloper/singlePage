import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, createStyles, withStyles, Theme } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Button,
  Divider,
  TextField,
  colors
} from '@material-ui/core';

const useStyles = createStyles((theme: Theme) => ({
  root: {},
  saveButton: {
    color: theme.palette.common.white,
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    }
  }
}));

class Security extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      values: {
        password: '',
        confirm: ''
      },
    }
  }

  handleChange = (event: any) => {
    this.setState({
      values: {
        ...this.state.values,
        [event.target.name]: event.target.value
      }
    })
  };

  render() {
    const { className, classes, ...rest } = this.props
    const valid = this.state.values.password && this.state.values.password === this.state.values.confirm;

    return (
      <Card
        {...rest}
        className={clsx(classes.root, className)}
      >
        <CardHeader title="Change password" />
        <Divider />
        <CardContent>
          <form>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                md={4}
                sm={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  onChange={this.handleChange}
                  type="password"
                  value={this.state.values.password}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={4}
                sm={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Confirm password"
                  name="confirm"
                  onChange={this.handleChange}
                  type="password"
                  value={this.state.values.confirm}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </form>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            className={classes.saveButton}
            disabled={!valid}
            variant="contained"
          >
            Save changes
        </Button>
        </CardActions>
      </Card>
    );

  }
}

export default withStyles(useStyles)(Security);
