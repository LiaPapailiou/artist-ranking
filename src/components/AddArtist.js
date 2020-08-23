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
        value={artist.artistName}
        placeholder="Artist Name"
        required
        onChange={(e) => onChange(e)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

AddArtist.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default AddArtist;
