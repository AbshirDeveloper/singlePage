/* eslint-disable no-undef */
import React, { useEffect } from 'react';
// import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';


const { NODE_ENV, REACT_APP_GA_MEASUREMENT_ID: GA_MEASUREMENT_ID } = process.env;

function Page(props: any) {
    const { title, children, ...rest } = props
    // const location = useLocation();

    useEffect(() => {
        // if (NODE_ENV !== 'production') {
        //     return;
        // }
        // const Window: any = window
        // if (Window.gtag) {
        //     Window.gtag('config', GA_MEASUREMENT_ID, {
        //         page_path: location.pathname,
        //         page_name: title
        //     });
        // }

        // eslint-disable-next-line
    }, []);

    return (
        <div {...rest}>
            {/* <Helmet> */}
            <title>{title}</title>
            {/* </Helmet> */}
            {children}
        </div>
    );
}

export default Page;
