import React from 'react';
import { useHistory } from 'react-router-dom'

const EditArtist = (props) => {
  const history = useHistory();
  // const { artist } = props;
  console.log(props)

  return (
    <form>
      <input
        type="text"
        placeholder="Edit name"
        name="artistName"
        // value={artist.artistName}
        required
      />
      <input
        type="text"
        placeholder="Photo link"
        name="artistPhoto"
      // value={artistPhoto}
      />
      <button type="submit">Edit</button>
      <button type="button" onClick={() => history.push('/')}>Go Back</button>
    </form>
  )
};

export default EditArtist;
