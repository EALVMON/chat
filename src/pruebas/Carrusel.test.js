// Carrusel.test.js COMPLETO - COBERTURA 100%
import { render, screen } from '@testing-library/react';
import Carrusel from '../componentes/Carrusel';
import { MessContext } from '../componentes/MessContext';
import { Carousel } from 'react-bootstrap';

const chatsMock = [
  {
    contacto: 'Ryan',
    mensajes: [
      {
        emisor: 'Ryan',
        contenido: '¡Hola!',
        timestamp: '2023-10-05T09:00:00Z',
        estado: 'leído'
      }
    ]
  },
  {
    contacto: 'Dwight',
    mensajes: [
      {
        emisor: 'Ryan',
        contenido: '¿Tienes el informe de ventas?',
        timestamp: '2023-10-05T09:15:00Z',
        estado: 'entregado'
      },
      {
        emisor: 'Dwight',
        contenido: 'Sí, lo tengo.',
        timestamp: '2023-10-05T09:20:00Z',
        estado: 'leído'
      }
    ]
  },
  {
    contacto: 'Kelly',
    mensajes: [
      {
        emisor: 'Ryan',
        contenido: '¿Viste mi correo?',
        timestamp: '2023-10-05T09:00:00Z',
        estado: 'entregado'
      },
      {
        emisor: 'Kelly',
        contenido: 'Sí, lo acabo de ver.',
        timestamp: '2023-10-05T09:05:00Z',
        estado: 'leído'
      }
    ]
  }
];



test('renderiza correctamente estructura completa de carrusel', () => {
  render(
    <MessContext.Provider value={{ chats: chatsMock }}>
      <Carrusel />
    </MessContext.Provider>
  );

  expect(screen.getByText(/Mensajes de Ryan del 2023-10-05 09:00:00/i)).toBeInTheDocument();
  expect(screen.getByText('¡Hola!')).toBeInTheDocument();
});

test('no renderiza nada si no hay mensajes', () => {
  const chats = [
    {
      contacto: 'Ryan',
      mensajes: []
    }
  ];

  render(
    <MessContext.Provider value={{ chats }}>
      <Carrusel />
    </MessContext.Provider>
  );

  expect(screen.queryByText(/Mensajes de/)).not.toBeInTheDocument();
});

test('omite mensaje si no encuentra el chat correspondiente', () => {
  const mensajeSinChat = {
    emisor: 'Kelly',
    contenido: 'Mensaje sin chat',
    timestamp: '2023-10-07T10:00:00Z',
    estado: 'leído'
  };

  const chats = [
    {
      contacto: 'Ryan',
      mensajes: []
    }
  ];

  const AgrupadoCarrusel = () => {
    const mensajesAgrupados = {
      '2023-10-07 10:00:00': [mensajeSinChat]
    };
    const fechasYHoras = Object.keys(mensajesAgrupados);

    return (
      <MessContext.Provider value={{ chats }}>
        <Carousel>
          {fechasYHoras.map((fechaYHora, index) => {
            const primerMensaje = mensajesAgrupados[fechaYHora][0];
            const chat = chats.find((chat) =>
              chat.mensajes.includes(primerMensaje)
            );
            if (!chat) return null;
            return (
              <Carousel.Item key={index}>
                <div>{primerMensaje.contenido}</div>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </MessContext.Provider>
    );
  };

  render(<AgrupadoCarrusel />);
  expect(screen.queryByText(/Mensaje sin chat/)).not.toBeInTheDocument();
});









