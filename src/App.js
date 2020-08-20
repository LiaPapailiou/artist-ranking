import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import AddArtist from './components/AddArtist'
import EditArtist from './components/EditArtist'
import ArtistList from './components/ArtistList'
// import './App.css';

function App() {
  const [artists, setArtists] = useState([
    {
      artistName: '',
      artistURL: '',
      stars: 0,
    },
  ])
  return (
    <div className="App">
      <h1>hi</h1>
      <Router>
        <AddArtist path='/' artistName={artists.artistName} onSubmit={(value) => setArtists(value)} />
        <ArtistList path='/' artists={artists} onStateChange={(value) => setArtists(value)} />
        <EditArtist patch='/:artist_name' artistName={artists.artistName} artistURL={artists.artistURL} onSubmit={(value) => setArtists(value)} />
      </Router>
    </div>
  );
}

export default App;
