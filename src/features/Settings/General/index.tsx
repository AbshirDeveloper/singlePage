import React, { useState } from 'react';
import clsx from 'clsx';
import { withStyles, createStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import GeneralSettings from './GeneralSettings';
import { GeneralState, GeneralProps } from '../types'

const useStyles = createStyles(() => ({
  root: {}
}));

class General extends React.Component<GeneralProps> {
  constructor(props: any) {
    super(props)
  }

  render() {
    const { className, classes, profile } = this.props
    return (
      <Grid
        className={clsx(classes.root, className)}
        container
        spacing={3}
      >
        <Grid
          item
          lg={8}
          md={6}
          xl={9}
          xs={12}
        >
          <GeneralSettings updateInfo={this.props.updateInfo} profile={profile} />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(useStyles)(General);
