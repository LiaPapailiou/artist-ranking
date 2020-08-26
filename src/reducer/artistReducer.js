import INITIAL_STATE from '../initialState';
import {
  ADD_ARTIST,
  EDIT_ARTIST,
  CHANGE_RATING_INC,
  CHANGE_RATING_DEC,
} from '../types';

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

export default artistReducer;
