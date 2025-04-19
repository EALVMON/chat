import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Contacto from '../componentes/Contacto';
import { MessContext } from '../componentes/MessContext';

const chatsMock = [
  {
    contacto: 'Kelly',
    mensajes: [
      {
        emisor: 'Kelly',
        contenido: 'Hola Dwight',
        timestamp: '2023-10-05T08:00:00Z',
        estado: 'enviado'
      },
      {
        emisor: 'Dwight',
        contenido: 'Hola Kelly',
        timestamp: '2023-10-05T08:05:00Z',
        estado: 'enviado'
      }
    ]
  },
  {
    contacto: 'Michael',
    mensajes: [
      {
        emisor: 'Michael',
        contenido: 'Hello, Jim!',
        timestamp: '2023-10-05T09:00:00Z',
        estado: 'enviado'
      }
    ]
  }
];

test('muestra la conversación del contacto Kelly', () => {
  render(
    <MessContext.Provider value={{ chats: chatsMock }}>
      <MemoryRouter initialEntries={['/contacto/Kelly']}>
        <Routes>
          <Route path="/contacto/:nombre" element={<Contacto />} />
        </Routes>
      </MemoryRouter>
    </MessContext.Provider>
  );

  expect(screen.getByText(/Conversación con Kelly/i)).toBeInTheDocument();
  expect(screen.getByText(/Hola Dwight/)).toBeInTheDocument();
  expect(screen.getByText(/Hola Kelly/)).toBeInTheDocument();
});

test('muestra mensaje si el contacto no existe', () => {
  render(
    <MessContext.Provider value={{ chats: [] }}>
      <MemoryRouter initialEntries={['/contacto/Desconocido']}>
        <Routes>
          <Route path="/contacto/:nombre" element={<Contacto />} />
        </Routes>
      </MemoryRouter>
    </MessContext.Provider>
  );

  expect(screen.getByText(/Contacto no encontrado/)).toBeInTheDocument();
});

test('muestra todos los mensajes del contacto Michael', () => {
  render(
    <MessContext.Provider value={{ chats: chatsMock }}>
      <MemoryRouter initialEntries={['/contacto/Michael']}>
        <Routes>
          <Route path="/contacto/:nombre" element={<Contacto />} />
        </Routes>
      </MemoryRouter>
    </MessContext.Provider>
  );

  expect(screen.getByText(/Conversación con Michael/i)).toBeInTheDocument();
  expect(screen.getByText(/Hello, Jim!/)).toBeInTheDocument();
});

test('muestra "Contacto no encontrado" cuando no hay mensajes para el contacto', () => {
  render(
    <MessContext.Provider value={{ chats: [] }}>
      <MemoryRouter initialEntries={['/contacto/Michael']}>
        <Routes>
          <Route path="/contacto/:nombre" element={<Contacto />} />
        </Routes>
      </MemoryRouter>
    </MessContext.Provider>
  );

  expect(screen.getByText(/Contacto no encontrado/)).toBeInTheDocument();
});

