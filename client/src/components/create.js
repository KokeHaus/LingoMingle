import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button } from 'react-bootstrap';
const navbarHeight = '56px';

const Create = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    nativeLanguage: '',
    targetLanguage: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Signup Success:', result);
        navigate('/signin'); 
      } else {
        throw new Error(`Error: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Signup Failed:', error);
    }
  };

  return (
    <Container style={{ paddingTop: navbarHeight, backgroundColor: '#f0f8ff', height: `calc(100vh - ${navbarHeight})`, maxWidth: '100vw' }} className="d-flex justify-content-center align-items-center">
      <Card style={{ width: '24rem', padding: '20px' }}>
        <Card.Body>
          <h3 className="text-center mb-4">Sign Up</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" name="username" onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Native language</Form.Label>
              <Form.Control type="text" placeholder="Native language" name="nativeLanguage" onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Target language</Form.Label>
              <Form.Control type="text" placeholder="Target language" name="targetLanguage" onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" name="password" onChange={handleInputChange} />
            </Form.Group>
            <div className="d-grid">
              <Button variant="primary" type="submit">
                Sign Up
              </Button>
            </div>
            <div className="text-center mt-3">
              <Link to="/signin">Already registered? Sign in</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Create;
