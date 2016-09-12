import React from 'react';

export const MainLayout = ({header, content, footer}) => (
  <div className="site">
    {header}
    <div className="main-layout site-content">
      {content}
    </div>
    {footer}
  </div>
)
