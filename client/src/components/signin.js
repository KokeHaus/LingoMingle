import React, { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const navbarHeight = '56px';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Sign-in Success:', result);
        localStorage.setItem('token', result.token); 
        localStorage.setItem('username', result.username); 
        navigate('/mingle');

        navigate('/mingle'); 
      } else {
        throw new Error(`Error: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Sign-in Failed:', error);
    }
  };

  return (
    <Container style={{ paddingTop: navbarHeight, backgroundColor: '#f0f8ff', height: `calc(100vh - ${navbarHeight})`, maxWidth: '100vw' }} className="d-flex justify-content-center align-items-center">
      <Card style={{ width: '24rem', padding: '20px' }}>
        <Card.Body>
          <h3 className="text-center mb-4">Sign In</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                onChange={handleInputChange}
              />
            </Form.Group>
            <div className="d-grid">
              <Button variant="primary" type="submit">
                Sign In
              </Button>
            </div>
            <div className="text-center mt-3">
              <Link to="/create">Don't have an account? Sign up</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SignIn;
