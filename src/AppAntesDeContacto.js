import ChatList from './componentes/ChatList';
import { MessProvider } from './componentes/MessContext';  
import './App.css';

function App() {
  return (
    <div>
      {/* Envuelve ChatList con el MessProvider */}
      <MessProvider>
        <ChatList />
      </MessProvider>
    </div>
  );
}

export default App;