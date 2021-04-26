import './App.css';
import { ChatEngine } from 'react-chat-engine'
import ChatFeed from './components/ChatFeed'
import SignInForm from './components/SignInForm';

function App() {
  // check if the user is logged in or not
  if(!localStorage.getItem('username')) return <SignInForm/>
  return (
    <ChatEngine 
      height="100vh"
      projectID="your (chatengine.io) project id here."
      userName={localStorage.getItem('username')}
      userSecret={localStorage.getItem('password')}
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
    />
  );
}

export default App;
