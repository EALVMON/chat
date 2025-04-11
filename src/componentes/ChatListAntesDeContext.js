import { useEffect, useState } from "react";
import { Table, Container, Card, Accordion } from "react-bootstrap";
import './ChatList.css'

const ChatList = () => {
    const [chats, setChats] = useState([]);

    const cargarChats = async () => {
        const response = await fetch('http://localhost:3000/mensajes.json');
        const data = await response.json();
        setChats(data.chats.map((chat, i) => ({ ...chat, id: i }))); // Añadir id a cada chat
    }

    useEffect(() => {
        cargarChats();
    }, []);

    return (
        <Container className="mt-4">
            <h2>Chats Realizados</h2>
            <Accordion defaultActiveKey="0" flush>
                {chats.map((chat, index) => (
                    <Accordion.Item eventKey={index} key={chat.contacto}>
                        <Accordion.Header className="chat_header">
                                   Contacto: {chat.contacto}
                        </Accordion.Header>
                        <Accordion.Body>
                            <Card key={"card" + chat.contacto}>
                                <Card.Body>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Chats</th>
                                                <th>Contacto</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {chat.mensajes.map((mensaje, mensajeIndex) => (
                                                <tr key={mensajeIndex}>
                                                    <td>{mensaje.emisor} vs {mensaje.contenido}</td>
                                                    <td>Fecha: {mensaje.timestamp} Estado: {mensaje.estado}</td> {/* Corregido el acceso a estado */}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </Container>
    );
}

export default ChatList;
