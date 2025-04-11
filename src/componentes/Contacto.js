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
              {chat.mensajes.map((mensaje, mensajeIndex) => (
                <tr key={mensajeIndex}>
                  <td>{mensaje.emisor}</td>
                  <td>{mensaje.contenido}</td>
                  <td>{new Date(mensaje.timestamp).toLocaleString()}</td>
                  <td>{mensaje.estado}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Contacto;
// Este componente muestra la conversación con un contacto específico.  