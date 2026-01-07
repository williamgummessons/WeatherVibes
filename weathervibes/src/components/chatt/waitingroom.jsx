import React, { useState } from 'react';
import { Col, Form, Button, Row } from 'react-bootstrap';

const WaitingRoom = ({ joinChatRoom, loading }) => {
    const [userName, setUserName] = useState('');

    return (
        <Form onSubmit={e => {    
            e.preventDefault();
            joinChatRoom(userName);
        }}>
            <Row className='px-5 py-5'>
                <Col sm={12} className='text-center'>
                    <Form.Group>
                        <Form.Control 
                            placeholder='Enter your username'
                            onChange={e => setUserName(e.target.value)} 
                            className="mb-3"
                        />
                    </Form.Group>
                </Col>
                <Col sm={12} className="text-center mt-3">
                    <Button variant='success' type='submit' disabled={!userName}>
                        {loading ? 'Joining...' : 'Join Weather Chat'}
                    </Button> 
                </Col>
            </Row>
        </Form>
    );
};

export default WaitingRoom;