import React, { useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import ArtistContext from './ArtistContext'
import AddArtist from './components/AddArtist';
import EditArtist from './components/EditArtist'
import ArtistList from './components/ArtistList';
import {
  ADD_ARTIST,
  EDIT_ARTIST,
  CHANGE_RATING_INC,
  CHANGE_RATING_DEC,
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
      const idx = state.artist.findIndex((item) => item.id === action.data.id);
      const artistNew = action.data;
      return {
        ...state,
        artist: [...state.artist.slice(0, idx), artistNew, ...state.artist.slice(idx + 1)],
      };
    case CHANGE_RATING_INC:
      const idx_inc = state.artist.findIndex((item) => item.id === action.id);
      let temp_inc = [...state.artist];
      return {
        ...state,
        artist: [...state.artist.slice(0, idx_inc), { ...temp_inc[idx_inc], artistStars: temp_inc[idx_inc].artistStars + 1 }, ...state.artist.slice(idx_inc + 1)],
      };
    case CHANGE_RATING_DEC:
      const idx_dec = state.artist.findIndex((item) => item.id === action.id);
      let temp_dec = [...state.artist];
      if (temp_dec[idx_dec].artistStars < 1) {
        return {
          ...state,
        };
      }
      return {
        ...state,
        artist: [...state.artist.slice(0, idx_dec), { ...temp_dec[idx_dec], artistStars: temp_dec[idx_dec].artistStars - 1 }, ...state.artist.slice(idx_dec + 1)],
      };
    default:
      return INITIAL_STATE;
  }
};

// https://bookingagentinfo.com/wp-content/uploads/2018/03/Ocean-Wisdom-Contact-Information.jpg

function App() {
  const [state, dispatch] = useReducer(artistReducer, INITIAL_STATE);
  const { artist } = state;

  return (
    <div className="App">
      <h1>Artist Ranking List</h1>
      <ArtistContext.Provider value={{ state, dispatch }}>
        <Router>
          <AddArtist exact path="/" onSubmit={(name) => dispatch({ type: ADD_ARTIST, artistName: name })} />
          <ArtistList
            exact path="/"
            onIncClick={(id) => dispatch({ type: CHANGE_RATING_INC, id: id })}
            onDecClick={(id) => dispatch({ type: CHANGE_RATING_DEC, id: id })}
          />
          <Switch>
            <EditArtist exact path='/artist/:id' onSubmit={(data) => dispatch({ type: EDIT_ARTIST, data })} />
          </Switch>
        </Router>
      </ArtistContext.Provider>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}

App.propTypes = {
  artist: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
};

export default App;
