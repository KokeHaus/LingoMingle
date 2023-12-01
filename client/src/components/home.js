import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const navbarHeight = '56px';

  // Check if the user is logged in
  const token = localStorage.getItem('token');
  const linkDestination = token ? '/select' : '/create';

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
            <Link className="btn btn-primary" to={linkDestination}>
              Start Mingling
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
};

export default HomePage;
