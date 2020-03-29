/* eslint-disable no-undef */
import React from 'react';

function Page(props: any) {
    const { title, children, ...rest } = props
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
