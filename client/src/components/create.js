import React from 'react';
import { Container, Button , Form} from 'react-bootstrap';

const Create = () => {
  return (
    <Container fluid style={{ backgroundColor: '#f0f8ff' }} className="p-5">
      <div className="text-center">
        <h1>Sign up or Sign in !</h1>
        <Form>
            
        </Form>
        <Button variant="primary" size="lg">
          Sign up
        </Button>
        <Button variant="secondary" size="lg">
            Sign In
        </Button>
      </div>
    </Container>
  );
};

export default Create;
