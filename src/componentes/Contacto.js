import React from 'react'; 
import { useParams } from 'react-router-dom'; // Para acceder a los parámetros de la URL
import { useMessContext } from './MessContext'; // Acceder al contexto
import { Container, Card, Table } from 'react-bootstrap';

const Contacto = () => {
  const { nombre } = useParams(); // Obtener el nombre del contacto desde la URL
  const { chats } = useMessContext();

  // Encuentra el chat correspondiente al contacto
  const chat = chats.find((chat) => chat.contacto === nombre);

  if (!chat) {
    return <div>Contacto no encontrado</div>; // Mensaje en caso de no encontrar el contacto
  }

  // Ordenar los mensajes por fecha
  const mensajesOrdenados = chat.mensajes.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  return (
    <Container className="mt-4">
      <h2>Conversación con {nombre}</h2>
      <Card>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Emisor</th>
                <th>Contenido</th>
                <th>Fecha</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {mensajesOrdenados.map((mensaje, mensajeIndex) => (
                <React.Fragment key={mensajeIndex}>
                  <tr>
                    <td>{mensaje.emisor}</td>
                    <td>{mensaje.contenido}</td>
                    <td>{new Date(mensaje.timestamp).toLocaleString()}</td>
                    <td>{mensaje.estado}</td>
                  </tr>
                  {/* Línea discontinua entre los mensajes */}
                  {mensajeIndex < mensajesOrdenados.length - 1 && (
                    <tr>
                      <td colSpan="4">
                        <div style={{ borderTop: '2px dashed #ccc', margin: '10px 0' }}></div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Contacto;
