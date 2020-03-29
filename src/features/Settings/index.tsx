import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  Container,
  Tabs,
  Tab,
  Divider,
  colors
} from '@material-ui/core';
import Page from '../../common/Page';
import Header from './Header';
import General from './General';
import Employees from './Employees';
import Security from './Security';

const useStyles = createStyles((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  tabs: {
    marginTop: theme.spacing(3)
  },
  divider: {
    backgroundColor: colors.grey[300]
  },
  content: {
    marginTop: theme.spacing(3)
  }
}));

const tabs = [
  { value: 'general', label: 'General' },
  { value: 'employees', label: 'Employees' },
  { value: 'security', label: 'Security' }
];

class Settings extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      currentTab: 'general'
    }
  }

  handleTabsChange = (event: any, value: any) => {
    this.setState({
      currentTab: value
    })
  };

  render() {
    const { classes, profile = {
      firstName: 'Abshir',
      lastName: 'Jama',
      email: '',
      phone: '',
      state: '',
      country: '',
      isPublic: '',
      canHire: ''
    } } = this.props
    return (
      <Page
        className={classes.root}
        title="Settings"
      >
        <Container maxWidth="lg">
          <Header />
          <Tabs
            className={classes.tabs}
            onChange={this.handleTabsChange}
            scrollButtons="auto"
            value={this.state.currentTab}
            variant="scrollable"
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.value}
                label={tab.label}
                value={tab.value}
              />
            ))}
          </Tabs>
          <Divider className={classes.divider} />
          <div className={classes.content}>
            {this.state.currentTab === 'general' && <General profile={profile} />}
            {this.state.currentTab === 'employees' && <Employees />}
            {this.state.currentTab === 'security' && <Security />}
          </div>
        </Container>
      </Page>
    );

  }
}

export default withStyles(useStyles)(Settings);
