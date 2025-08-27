import { useEffect } from 'react';

function Chatbot() {
  useEffect(() => {
    // Check if script is already added
    if (!document.querySelector('script[src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"]')) {
      const script = document.createElement('script');
      script.src = 'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1';
      script.async = true;
      script.onload = () => console.log('Dialogflow script loaded successfully');
      script.onerror = () => console.error('Dialogflow script failed to load');
      document.body.appendChild(script);
    }

    // Cleanup on unmount
    return () => {
      const script = document.querySelector('script[src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"]');
      if (script) document.body.removeChild(script);
    };
  }, []); // Empty dependency array ensures it runs once

  return (
    <df-messenger
      intent="WELCOME"
      chat-title="OneTouchMoveBot"
      agent-id="10d965a5-e657-4bcb-837c-d5c9b124bfde"
      language-code="en"
    ></df-messenger>
  );
}

export default Chatbot;