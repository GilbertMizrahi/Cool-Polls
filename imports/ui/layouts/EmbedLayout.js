import React, { PropTypes } from 'react';

const EmbedLayout = ({ content, footer }) => (
        <div className="site">
            <div className="embed-layout site-content">
                {content}
            </div>
            {footer}
        </div>
);

EmbedLayout.propTypes = {
    content: PropTypes.object,
    footer: PropTypes.object,
};

export default EmbedLayout;
