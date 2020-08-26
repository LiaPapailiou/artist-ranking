import React, { useReducer } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import './App.css';
import ArtistContext from './ArtistContext';
import AddArtist from './components/AddArtist';
import EditArtist from './components/EditArtist';
import ArtistList from './components/ArtistList';
import artistReducer from './reducer/artistReducer';
import INITIAL_STATE from './initialState';
import {
  ADD_ARTIST,
  EDIT_ARTIST,
  CHANGE_RATING_INC,
  CHANGE_RATING_DEC,
} from './types';

function App() {
  const [state, dispatch] = useReducer(artistReducer, INITIAL_STATE);

  return (
    <div className="App">
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
      {/* <pre>{JSON.stringify(state, null, 2)}</pre> */ }
    </div>
  );
}

export default App;
