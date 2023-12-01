import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Container, Card, Button, Row, Col, Spinner } from 'react-bootstrap';

const Select = () => {
  const [loading, setLoading] = useState(false);
  const [queueType, setQueueType] = useState(null); // 'text' or 'voice'
  const [queueSize, setQueueSize] = useState(0);
  const [socket, setSocket] = useState(null);
  const navbarHeight = '56px';

  useEffect(() => {
    // Establish WebSocket connection
    const newSocket = io('http://localhost:5000'); // Adjust URL to your server
    setSocket(newSocket);

    // Listen for match event
    newSocket.on('match', (data) => {
      console.log('Match found:', data);
      setLoading(false); // Stop loading when a match is found
      setQueueType(null); // Reset queue type
      // Handle match logic here
    });

    return () => newSocket.close();
  }, []);
  useEffect(() => {
    let intervalId;
    if (loading) {
      intervalId = setInterval(async () => {
        const response = await fetch(`http://localhost:5000/api/${queueType}-queue-size`);
        if (response.ok) {
          const data = await response.json();
          setQueueSize(data.size);
        }
      }, 5000); // Poll every 5 seconds
    }

    return () => clearInterval(intervalId);
  }, [loading, queueType]);


    const joinQueue = async (type) => {
      setLoading(true);
      setQueueType(type);
      const username = localStorage.getItem('username');
    
      // Emit event to join queue via WebSocket
      socket.emit('joinQueue', { username, type });
    
      // Make a POST request to join the queue on the server
      try {
        const response = await fetch(`http://localhost:5000/api/join${type}queue`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username })
        });
    
        if (response.ok) {
          const data = await response.json();
          setQueueSize(data.queueSize); // Update the queue size from the server response
        } else {
          console.error('Failed to join the queue');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    
      // setLoading(false); // You might want to keep loading true until a match is found
    };

    //exit queue
    const leaveQueue = async () => {
      if (!queueType) return; // Check if the user has joined a queue
    
      const username = localStorage.getItem('username');
      try {
        const response = await fetch(`http://localhost:5000/api/leave${queueType}queue`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username })
        });
    
        if (response.ok) {
          console.log(`Left ${queueType} queue successfully`);
          // Update states as necessary
          setLoading(false);
          setQueueType(null);
          setQueueSize(0); // Reset queue size if needed
        } else {
          console.error(`Failed to leave ${queueType} queue`);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    

  return (
    <Container style={{ paddingTop: navbarHeight, backgroundColor: '#f0f8ff', height: `calc(100vh - ${navbarHeight})`, maxWidth: '100vw' }} className="d-flex justify-content-center align-items-center">
      <Card style={{ width: '30rem', padding: '20px' }}>
        <Card.Body>
          <h3 className="text-center mb-4">Start Mingling!</h3>

          {loading ? (
            <>
              <Spinner animation="border" className="mb-3" />
              <p>Users in queue: {queueSize}</p>
              <Button variant="danger" onClick={leaveQueue}>
                Cancel
              </Button>


            </>
          ) : (
            <>
              <Row className="mb-3">
                <Col className="text-center">
                  <Button variant="outline-primary" size="lg" className="w-100 mb-3" onClick={() => joinQueue('text')}>
                    Text
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col className="text-center">
                  <Button variant="outline-secondary" size="lg" className="w-100" onClick={() => joinQueue('voice')}>
                    Voice
                  </Button>
                </Col>
              </Row>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Select;
