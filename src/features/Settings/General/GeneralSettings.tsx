import React from 'react';
import clsx from 'clsx';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Divider,
  TextField,
  colors
} from '@material-ui/core';
import { GeneralProps, GeneralState } from '../types'
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

const stateOptions = ['Bosaso', 'Haregeisa', 'Wajaale'];

class GeneralSettings extends React.Component<GeneralProps, GeneralState> {
  constructor(props: any) {
    super(props)
    this.state = {
      values: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        branch: '',
        userType: ''
      },
      openSnackbar: false
    }
  }

  componentDidMount() {
    this.setState({
      values: this.props.profile
    })
  }

  handleChange = (event: any) => {
    event.persist();
    this.setState({
      values: {
        ...this.state.values,
        [event.target.name]: event.target.value
      }
    })
  };

  handleSubmit = (event: any) => {
    event.preventDefault();
    this.setState({
      openSnackbar: true
    })
    this.props.updateInfo(this.state.values)
  };

  render() {
    const { profile, className, classes, ...rest } = this.props
    return (
      <Card
        className={clsx(classes.root, className)}
      >
        <form onSubmit={this.handleSubmit}>
          <CardHeader title="Profile" />
          <Divider />
          <CardContent>
            <Grid
              container
              spacing={4}
            >
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  helperText="Please specify the first name"
                  label="First name"
                  name="firstName"
                  onChange={this.handleChange}
                  required
                  value={this.state.values.firstName}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Last name"
                  name="lastName"
                  onChange={this.handleChange}
                  required
                  value={this.state.values.lastName}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={this.handleChange}
                  required
                  value={this.state.values.email}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  onChange={this.handleChange}
                  type="text"
                  value={this.state.values.phone}
                  variant="outlined"
                />
              </Grid>
              {!this.state.values.userType ? <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Branch"
                  name="branch"
                  onChange={this.handleChange}
                  select
                  SelectProps={{ native: true }}
                  value={this.state.values.branch}
                  variant="outlined"
                >
                  {stateOptions.map((state) => (
                    <option
                      key={state}
                      value={state}
                    >
                      {state}
                    </option>
                  ))}
                </TextField>
              </Grid> : ''}
            </Grid>
          </CardContent>
          <Divider />
          <CardActions>
            <Button
              className={classes.saveButton}
              type="submit"
              variant="contained"
            >
              Save Changes
          </Button>
          </CardActions>
        </form>
      </Card>
    );
  }
}

export default withStyles(useStyles)(GeneralSettings);
