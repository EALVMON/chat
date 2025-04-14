import { useMessContext } from './MessContext';
import { Carousel, Card } from 'react-bootstrap';

// Agrupar los mensajes por fecha y hora
const agruparPorFechaYHora = (chats) => {
  const mensajesAgrupados = {};

  chats.forEach((chat) => {
    chat.mensajes.forEach((mensaje) => {
      // Crear una clave con fecha y hora
      const fechaYHora = mensaje.timestamp.split("T")[0] + " " + mensaje.timestamp.split("T")[1].split("Z")[0]; // Ejemplo: 2023-10-05 09:00:00
      if (!mensajesAgrupados[fechaYHora]) {
        mensajesAgrupados[fechaYHora] = [];
      }
      mensajesAgrupados[fechaYHora].push(mensaje);
    });
  });

  return mensajesAgrupados;
};

const Carrusel = () => {
  const { chats } = useMessContext();

  // Agrupar los mensajes por fecha y hora
  const mensajesPorFechaYHora = agruparPorFechaYHora(chats);

  // Crear un array de claves (fecha y hora)
  const fechasYHoras = Object.keys(mensajesPorFechaYHora);

  // Función para determinar la imagen según el emisor
  const obtenerImagenEmisor = (emisor) => {
    if (emisor === 'Ryan') {
      return '/Oso.jpg'; // Imagen para Ryan
    } else if (emisor === 'Dwight') {
      return '/zorro.jpeg'; // Imagen para Dwight
    }
    else if (emisor === 'Kelly') {
        return '/ardilla.jpg'; // Imagen para Kelly
      }
    return '/default.jpg'; // Imagen predeterminada si el emisor es otro
  };

  return (
    <Carousel>
      {fechasYHoras.map((fechaYHora, index) => {
        // Obtener el primer mensaje de esa fecha y hora
        const primerMensaje = mensajesPorFechaYHora[fechaYHora][0];
        
        // Buscar el chat correspondiente a la fecha y hora
        const chat = chats.find((chat) => chat.mensajes.includes(primerMensaje));

        // Si no se encuentra el chat, omitir la iteración
        if (!chat) return null;

        return (
          <Carousel.Item key={index}>
            <Card className="text-center mx-auto" style={{ width: '400px' }}>
              {/* Imagen del emisor (determinada por el mensaje) */}
              <Card.Img
                variant="top"
                src={obtenerImagenEmisor(primerMensaje.emisor)} // Usamos el primer mensaje para obtener el emisor
                alt="Imagen de contacto"
              />
              <Card.Body>
                {/* Mostrar el nombre del contacto */}
                <Card.Title>Mensajes de {chat.contacto} del {fechaYHora}</Card.Title>
                {/* Lista de mensajes de esa fecha y hora */}
                <ul>
                  {mensajesPorFechaYHora[fechaYHora].map((mensaje, mensajeIndex) => (
                    <li key={mensajeIndex}>
                      <p><strong>{mensaje.emisor}:</strong> {mensaje.contenido}</p>
                      <p><small>{new Date(mensaje.timestamp).toLocaleString()}</small></p>
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default Carrusel;
