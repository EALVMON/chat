import { BrowserRouter } from 'react-router-dom'; // Importa BrowserRouter
import { Route, Routes } from 'react-router-dom'; // Rutas y componentes de ruta
import ChatList from './componentes/ChatList';
import Contacto from './componentes/Contacto'; // Componente para mostrar la conversación de un contacto
import NavigationBar from './componentes/NavigationBar'; // Barra de navegación
import { MessProvider } from './componentes/MessContext';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter> {/* Envuelve todo en BrowserRouter */}
    
      <MessProvider>
      <NavigationBar /> 
        <Routes>
          {/* Ruta principal que muestra la lista de chats */}
          <Route path="/" element={<ChatList />} />

          {/* Ruta para mostrar la conversación con un contacto */}
          <Route path="/contacto/:nombre" element={<Contacto />} />
        </Routes>
        <Contacto />
      </MessProvider>
    </BrowserRouter>
  );
}

export default App;


