import React, { useReducer } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AddArtist from './components/AddArtist';
// import EditArtist from './components/EditArtist'
import ArtistList from './components/ArtistList';
import {
  ADD_ARTIST,
  EDIT_ARTIST,
  INCREMENT_STARS,
  DECREMENT_STARS,
} from './types';

const INITIAL_STATE = {
  counter: 0,
  artist: [
    {
      id: 0,
      artistName: '',
      artistPhoto: '',
      artistStars: 0,
    },
  ],
};

const artistReducer = (state, action) => {
  const { type } = action;
  const newCounter = state.counter + 1;
  const newArtist = {
    id: newCounter,
    artistName: action.artistName,
    artistPhoto: '',
    artistStars: 0,
  };
  switch (type) {
    case ADD_ARTIST:
      return {
        counter: newCounter,
        artist: [...state.artist, newArtist],
      };
    case EDIT_ARTIST:
      return {
        artist: [...state.artist, { [action.field]: action.value }],
      };
    case INCREMENT_STARS:
      return {
        artist: [...state.artist, { artistStars: state.artistStars + 1 }],
      };
    case DECREMENT_STARS:
      return {
        artist: [...state.artist, { artistStars: state.artistStars - 1 }],
      };
    default:
      return INITIAL_STATE;
  }
};

const artistContext = React.createContext(null);
function App() {
  const [state, dispatch] = useReducer(artistReducer, INITIAL_STATE);
  const { artist } = state;
  // const handleSubmit = (field, value) => {
  //   dispatch({ type: EDIT_ARTIST, [field]: value });
  // }
  // console.log('IN APP', artist)
  return (
    <div className="App">
      <h1>Artist Ranking List</h1>
      <artistContext.Provider value={{ state, dispatch }}>
        <Router>
          <AddArtist path="/" onSubmit={(name) => dispatch({ type: ADD_ARTIST, artistName: name })} />
          <ArtistList path="/" artist={artist} />
          {/* <EditArtist patch='/:id' onSubmit={(field, value) => handleSubmit(field, value))} /> */}
        </Router>
      </artistContext.Provider>
    </div>
  );
}

export default App;
