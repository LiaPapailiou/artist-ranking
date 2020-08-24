import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AddArtist = (props) => {
  const [artist, setArtist] = useState({
    artistName: '',
  });

  const onChange = (e) => {
    setArtist({ ...artist, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(artist.artistName);
    setArtist({
      artistName: '',
    });
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        name="artistName"
        className="input-field"
        value={artist.artistName}
        required
        placeholder="type something..."
        onChange={(e) => onChange(e)}
      />
      <button type="submit" className="btn">Add</button>
    </form>
  );
};

AddArtist.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default AddArtist;
