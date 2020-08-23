import React, { useState, useContext } from 'react';
import ArtistContext from '../ArtistContext'
import { useHistory } from 'react-router-dom'

const EditArtist = (props) => {
  const history = useHistory();
  const value = useContext(ArtistContext);
  const idx = value.state.artist.findIndex((item) => item.id == props.match.params.id);
  const current = value.state.artist[idx];
  const [formData, setFormData] = useState({
    id: !current ? '' : current.id,
    artistName: !current ? '' : current.artistName,
    artistPhoto: !current ? '' : current.artistPhoto,
    artistStars: !current ? 0 : current.artistStars,
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(formData);
    setFormData({
      artistName: '',
      artistPhoto: '',
    });
  }

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <input
        type="text"
        placeholder="Edit name"
        name="artistName"
        value={formData.artistName}
        onChange={(e) => onChange(e)}
        required
      />
      <input
        type="text"
        placeholder="Photo link"
        name="artistPhoto"
        onChange={(e) => onChange(e)}
        value={formData.artistPhoto}
      />
      <button type="submit">Edit</button>
      <button type="button" onClick={() => history.push('/home')}>Go Back</button>
    </form >
  )
};

export default EditArtist;
