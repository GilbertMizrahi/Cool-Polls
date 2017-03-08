import React, { PropTypes } from 'react';

const MainLayout = ({ header, content, footer }) => (
        <div className="site">
            {header}
            <div className="main-layout site-content">
                {content}
            </div>
            {footer}
        </div>
);

MainLayout.propTypes = {
    header: PropTypes.object,
    content: PropTypes.object,
    footer: PropTypes.object,
};

export default MainLayout;
