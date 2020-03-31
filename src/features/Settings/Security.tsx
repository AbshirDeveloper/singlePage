import React from 'react';
import clsx from 'clsx';
import { createStyles, withStyles, Theme } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Button,
  Divider,
  TextField,
  colors,
  Typography
} from '@material-ui/core';
import { validatePassword } from '../../Utils/utls'
import { SecurityProps, SecurityState } from './types'
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

class Security extends React.Component<SecurityProps, SecurityState> {
  constructor(props: any) {
    super(props)
    this.state = {
      values: {
        password: '',
        confirm: ''
      },
      isValid: true,
      errorMessage: ''
    }
  }

  handleChange = (event: any) => {
    let isValid = true;
    let errorMessage = '';
    if (event.target.name === 'password') {
      const valid = validatePassword(event.target.value)
      if (!valid) {
        errorMessage = "Password must be atleast 8 chars long and contains upper and lower case chars"
      }
      isValid = valid
    }
    this.setState({
      values: {
        ...this.state.values,
        [event.target.name]: event.target.value
      },
      isValid: isValid,
      errorMessage: errorMessage
    })
  };

  updatePassword = () => {
    this.props.updatePassword(this.state.values.password)
  }

  render() {
    const { className, classes, ...rest } = this.props
    const valid = this.state.values.password && this.state.values.password === this.state.values.confirm && this.state.isValid;

    return (
      <Card
        className={clsx(classes.root, className)}
      >
        <CardHeader title="Change password" />
        <Divider />
        <CardContent>
          <Typography color="error">
            {this.state.errorMessage}
          </Typography>
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
            onClick={this.updatePassword}
          >
            Save changes
        </Button>
        </CardActions>
      </Card>
    );

  }
}

export default withStyles(useStyles)(Security);
