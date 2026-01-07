/* 
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import WaitingRoom from './waitingroom';
import { useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import ChatRoom from './chatroom';

function App() {
  const [conn, setConnection] = useState();
  const [messages, setMessages] = useState([]);

  const joinChatRoom = async (userName, chatRoom) => {
    try {
      const conn = new HubConnectionBuilder()
                .withUrl("http://localhost:5177/chat")
                .configureLogging(LogLevel.Information)
                .build();
      
    conn.on("JoinSpecificChatRoom", (userName, msg) => {
        console.log(userName + "msg: " + msg);
        setMessages(messages => [...messages, { userName, msg }]);          
    });

      conn.on("ReceiveSpecificMessage", (userName, msg) => {
        setMessages(messages => [...messages, { userName, msg }]);        
      });

      await conn.start();
      await conn.invoke("JoinSpecificChatRoom", { userName, chatRoom });
      setConnection(conn);
    } catch(e) {
      console.log(e);
    }
  }

  const sendMessage = async (message) => {
    try {
      await conn.invoke("SendMessage", message);
    } catch(e) {
      console.log(e);
    }
  }

  return (
    <div>
      <main>
        <Container>
          <Row className='px-5 my-5'>
            <Col sm='12'>
              <h1 className = 'font-weight-light'>Välkommen till min chatapp</h1>
              <p>Snacka enkelt med dina vänner, skriv in ett användarnamn och ett rum att gå med i!</p>
            </Col>
          </Row>
          { !conn 
          ?<WaitingRoom joinChatRoom={joinChatRoom}></WaitingRoom>
          :<ChatRoom messages={messages} sendMessage={sendMessage}></ChatRoom>
          }

        </Container>
      </main>
    </div>
  );
}

export default App;
 */