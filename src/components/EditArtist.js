import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import ArtistContext from '../ArtistContext';

const EditArtist = (props) => {
  const history = useHistory();
  const value = useContext(ArtistContext);
  const { artist } = value.state;
  const idx = artist.findIndex((item) => item.id === parseInt(props.match.params.id, 10));
  const current = value.state.artist[idx];
  const [formData, setFormData] = useState({
    id: !current ? '' : current.id,
    artistName: !current ? '' : current.artistName,
    artistPhoto: !current ? '' : current.artistPhoto,
    artistStars: !current ? 0 : current.artistStars,
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(formData);
    setFormData({
      artistName: '',
      artistPhoto: '',
    });
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <input
        type="text"
        placeholder="edit name..."
        name="artistName"
        value={formData.artistName}
        className="input-field"
        onChange={(e) => onChange(e)}
        required
      />
      <br />
      <input
        type="text"
        placeholder="photo link..."
        name="artistPhoto"
        className="input-field"
        onChange={(e) => onChange(e)}
        value={formData.artistPhoto}
      />
      <br />
      <div className="btn-control">
        <button type="submit" className="btn">Edit</button>
        <button type="button" className="btn" onClick={() => history.push('/home')}>Back</button>
      </div>
    </form>
  );
};

EditArtist.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

export default EditArtist;
