import React, { useReducer } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import ArtistContext from './ArtistContext';
import AddArtist from './components/AddArtist';
import EditArtist from './components/EditArtist';
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
  const idxInc = state.artist.findIndex((item) => item.id === action.id);
  const tempInc = [...state.artist];
  const idxDec = state.artist.findIndex((item) => item.id === action.id);
  const tempDec = [...state.artist];
  const artistNew = {
    id: action.id,
    artistName: action.artistName,
    artistPhoto: action.artistPhoto,
    artistStars: action.artistStars,
  };
  const idx = state.artist.findIndex((item) => item.id === action.id);
  switch (type) {
    case ADD_ARTIST:
      return {
        counter: newCounter,
        artist: [...state.artist, newArtist],
      };
    case EDIT_ARTIST:
      // const artistNew = action.data;
      return {
        ...state,
        artist: [...state.artist.slice(0, idx), artistNew, ...state.artist.slice(idx + 1)],
      };
    case CHANGE_RATING_INC:
      return {
        ...state,
        artist: [
          ...state.artist.slice(0, idxInc),
          { ...tempInc[idxInc], artistStars: tempInc[idxInc].artistStars + 1 },
          ...state.artist.slice(idxInc + 1),
        ],
      };
    case CHANGE_RATING_DEC:
      if (tempDec[idxDec].artistStars < 1) {
        return {
          ...state,
        };
      }
      return {
        ...state,
        artist: [
          ...state.artist.slice(0, idxDec),
          { ...tempDec[idxDec], artistStars: tempDec[idxDec].artistStars - 1 },
          ...state.artist.slice(idxDec + 1),
        ],
      };
    default:
      return INITIAL_STATE;
  }
};

function App() {
  const [state, dispatch] = useReducer(artistReducer, INITIAL_STATE);

  return (
    <div className="App">
      <h1>Artist Ranking List</h1>
      <ArtistContext.Provider value={{ state, dispatch }}>
        <Router>
          <Route
            path="/home"
            render={() => (
              <AddArtist
                onSubmit={(name) => dispatch({ type: ADD_ARTIST, artistName: name })}
              />
            )}
          />
          <Route
            path="/home"
            render={() => (
              <ArtistList
                onIncClick={(incId) => dispatch({ type: CHANGE_RATING_INC, id: incId })}
                onDecClick={(decId) => dispatch({ type: CHANGE_RATING_DEC, id: decId })}
              />
            )}
          />
          <Redirect to="/home" />
          <Switch>
            <Route
              exact
              path="/artist/:id"
              render={(props) => (
                <EditArtist
                  {...props}
                  onSubmit={(data) => dispatch({
                    type: EDIT_ARTIST,
                    id: data.id,
                    artistName: data.artistName,
                    artistPhoto: data.artistPhoto,
                    artistStars: data.artistStars,
                  })}
                />
              )}
            />
          </Switch>
        </Router>
      </ArtistContext.Provider>
    </div>
  );
}

export default App;
