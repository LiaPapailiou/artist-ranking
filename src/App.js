import React, { useReducer, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
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
      return {
        artist: [...state.artist, { [action.field]: action.value }],
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
// function useLocallyPersistedReducer(reducer, defaultState, storageKey, init = null) {
//   const hookVars = useReducer(reducer, defaultState, (defaultState) => {
//     const persisted = JSON.parse(localStorage.getItem(storageKey))
//     return persisted !== null
//       ? persisted
//       : init !== null ? init(defaultState) : defaultState
//   })

//   useEffect(() => {
//     localStorage.setItem(storageKey, JSON.stringify(hookVars[0]))
//   }, [storageKey, hookVars[0]])

//   return hookVars
// }
const artistContext = React.createContext(null);
function App() {
  const [state, dispatch] = useReducer(artistReducer, INITIAL_STATE);
  const { artist } = state;

  const handleSubmit = (field, value) => {
    dispatch({ type: EDIT_ARTIST, [field]: value });
  }

  // console.log('IN APP', artist)

  return (
    <div className="App">
      <h1>Artist Ranking List</h1>
      <artistContext.Provider value={{ state, dispatch }}>
        <Router>
          <AddArtist path="/" onSubmit={(name) => dispatch({ type: ADD_ARTIST, artistName: name })} />
          <ArtistList
            path="/"
            artist={artist}
            onIncClick={(id) => dispatch({ type: CHANGE_RATING_INC, id: id })}
            onDecClick={(id) => dispatch({ type: CHANGE_RATING_DEC, id: id })}
          />
          <Route path='/artist/:id' onSubmit={(field, value) => handleSubmit(field, value)}
            render={(artist) => <artistContext.Provider value={{ state, dispatch }}>
              <EditArtist {...artist} />
            </artistContext.Provider>}></Route>
        </Router>
      </artistContext.Provider>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}

App.propTypes = {
  artist: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
};

export default App;
