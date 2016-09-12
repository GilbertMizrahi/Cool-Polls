import React from 'react';

export const EmbedLayout = ({header, content, footer}) => (
  <div className="site">
    {header}
    <div className="embed-layout site-content" >
      {content}
    </div>
    {footer}
  </div>
)
