import { InputGroup, Form, Button } from "react-bootstrap";
import { useState } from "react";

const SendMessageForm = ({ sendMessage }) => {
  const [msg, setMessage] = useState('');
  
  return (
    <Form onSubmit={e => {
      e.preventDefault();
      sendMessage(msg);
      setMessage('');
    }}>
      <InputGroup className="mb-3">
        <InputGroup.Text>Chat</InputGroup.Text>
        <Form.Control 
          onChange={e => setMessage(e.target.value)} 
          value={msg} 
          placeholder="Skriv ett meddelande..." 
        />
        <Button variant="primary" type="submit" disabled={!msg}>
          Skicka
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SendMessageForm;