'use client';

import { useEffect } from 'react';

const LeadConnectorWidget = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://widgets.leadconnectorhq.com/loader.js';
    script.setAttribute('data-resources-url', 'https://widgets.leadconnectorhq.com/chat-widget/loader.js');
    script.setAttribute('data-widget-id', '6a50218649fe6f51ce9eaaf2');
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      data-chat-widget
      data-widget-id="6a50218649fe6f51ce9eaaf2"
      data-location-id="1B2w5GqvclQDUOt9NfYo"
    />
  );
};

export default LeadConnectorWidget;
