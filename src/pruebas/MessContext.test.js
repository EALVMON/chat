// MessContext.test.js COMPLETO
import { render, waitFor } from '@testing-library/react';
import { MessProvider, useMessContext } from '../componentes/MessContext';

const mockChats = {
  chats: [
    {
      contacto: 'Dwight',
      mensajes: [
        {
          emisor: 'Dwight',
          contenido: '¡Hola!',
          timestamp: '2023-10-06T10:00:00Z',
          estado: 'leído'
        }
      ]
    }
  ]
};

beforeEach(() => {
  jest.restoreAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

function TestComponent() {
  const { chats } = useMessContext();
  return <div>{chats.length > 0 ? chats[0].contacto : 'Cargando...'}</div>;
}

test('carga los chats correctamente desde el fetch simulado', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockChats)
    })
  );

  const { getByText } = render(
    <MessProvider>
      <TestComponent />
    </MessProvider>
  );

  await waitFor(() => {
    expect(getByText('Dwight')).toBeInTheDocument();
  });
});

test('maneja errores en el fetch y muestra mensaje de carga', async () => {
  global.fetch = jest.fn(() => Promise.reject(new Error('Error en el servidor')));

  const ErrorComponent = () => {
    const { chats } = useMessContext();
    return <div>{chats.length === 0 ? 'Sin datos' : 'Con datos'}</div>;
  };

  const { getByText } = render(
    <MessProvider>
      <ErrorComponent />
    </MessProvider>
  );

  await waitFor(() => {
    expect(getByText('Sin datos')).toBeInTheDocument();
  });
});

test('muestra estado vacío si fetch devuelve chats vacíos', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ chats: [] })
    })
  );

  const EmptyComponent = () => {
    const { chats } = useMessContext();
    return <div>{chats.length === 0 ? 'No hay mensajes' : 'Hay mensajes'}</div>;
  };

  const { getByText } = render(
    <MessProvider>
      <EmptyComponent />
    </MessProvider>
  );

  await waitFor(() => {
    expect(getByText('No hay mensajes')).toBeInTheDocument();
  });
});

test('asigna un id a cada chat cargado', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockChats)
    })
  );

  const IDComponent = () => {
    const { chats } = useMessContext();
    return (
      <>
        {chats.map((chat) => (
          <div key={chat.id}>ID: {chat.id}</div>
        ))}
      </>
    );
  };

  const { getByText } = render(
    <MessProvider>
      <IDComponent />
    </MessProvider>
  );

  await waitFor(() => {
    expect(getByText('ID: 0')).toBeInTheDocument();
  });
});
test('lanza un error si useMessContext se usa fuera de un MessProvider', () => {
  const TestComponent = () => {
    // Intentar acceder al contexto fuera de un MessProvider
    const { chats } = useMessContext();
    return <div>{chats.length}</div>;
  };

  // Esperamos que se lance un error cuando el componente intente acceder al contexto
  expect(() => render(<TestComponent />)).toThrow('useMessContext debe ser usado dentro de un MessProvider');
});

