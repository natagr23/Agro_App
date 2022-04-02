import * as React from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';

export default function Home() {
  return (
    <>
      <main>
        <h2>Welcome to the homepage!</h2>
        <p>You can do this, I believe in you.</p>
        <SearchBar />
      </main>
    </>
  );
}
