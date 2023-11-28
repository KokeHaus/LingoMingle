import React from 'react';
import { Container, Button } from 'react-bootstrap';

const HomePage = () => {

  const navbarHeight = '56px';

  return (
    <>
      <div style={{ paddingTop: navbarHeight, backgroundColor: '#f0f8ff', height: `calc(100vh - ${navbarHeight})`, overflow: 'hidden' }}>
        <Container className="h-100 d-flex flex-column justify-content-center align-items-center">
          <div className="text-center">
            <h1>Welcome to LingoMingle!</h1>
            <p>
              Connect with language enthusiasts from around the world, 
              practice your language skills, and make new friends!
            </p>
            <Button variant="primary" size="lg">
              Start Mingling
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
};

export default HomePage;
