import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { Button, TextField } from '@material-ui/core';
import { Theme, createStyles, withStyles } from '@material-ui/core/styles';
import { LoginFormProps, LoginFormState } from './types'

const useStyles = createStyles((theme: Theme) => ({
    root: {},
    fields: {
        margin: theme.spacing(-1),
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            flexGrow: 1,
            margin: theme.spacing(1)
        }
    },
    submitButton: {
        marginTop: theme.spacing(2),
        width: '100%'
    }
}));

class LoginForm extends React.Component<LoginFormProps, LoginFormState> {
    constructor(props: any) {
        super(props)
        this.state = {
            formState: {
                isValid: false,
                values: {},
                touched: {},
                errors: {}
            }
        }
    }

    handleChange = (event: any) => {
        event.persist();

        this.setState({
            ...this.state,
            formState: {
                ...this.state.formState,
                values: {
                    ...this.state.formState.values,
                    [event.target.name]:
                        event.target.type === 'checkbox'
                            ? event.target.checked
                            : event.target.value
                },
                touched: {
                    ...this.state.formState.touched,
                    [event.target.name]: true
                }
            }
        });
    };

    handleSubmit = async (event: any) => {
        event.preventDefault();
    };

    hasError = (field: any) => (!!(this.state.formState.touched[field] && this.state.formState.errors[field]));

    render() {
        const { className, classes, ...rest } = this.props

        return (
            <form
                {...rest}
                className={clsx(classes.root, className)}
                onSubmit={this.handleSubmit}
            >
                <div className={classes.fields}>
                    <TextField
                        error={this.hasError('email')}
                        fullWidth
                        helperText={this.hasError('email') ? this.state.formState.errors.email[0] : null}
                        label="Email address"
                        name="email"
                        onChange={this.handleChange}
                        value={this.state.formState.values.email || ''}
                        variant="outlined"
                    />
                    <TextField
                        error={this.hasError('password')}
                        fullWidth
                        helperText={
                            this.hasError('password') ? this.state.formState.errors.password[0] : null
                        }
                        label="Password"
                        name="password"
                        onChange={this.handleChange}
                        type="password"
                        value={this.state.formState.values.password || ''}
                        variant="outlined"
                    />
                </div>
                <Button
                    className={classes.submitButton}
                    color="secondary"
                    disabled={!this.state.formState.isValid}
                    size="large"
                    type="submit"
                    variant="contained"
                >
                    Sign in
                </Button>
            </form>
        );
    }
}

export default withStyles(useStyles)(LoginForm);
