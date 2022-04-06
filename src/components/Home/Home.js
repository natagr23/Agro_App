import React, { useEffect } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  let navigate = useNavigate();
  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token');

    if (authToken) {
      navigate('/home');
    }

    if (!authToken) {
      navigate('/login');
    }
  }, [navigate]);
  return (
    <>
      <div> Home Page</div>
      <p> Home...</p>
      <SearchBar />
    </>
  );
}
