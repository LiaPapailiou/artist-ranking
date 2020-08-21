import React, { useState } from 'react';

const AddArtist = (props) => {
  const [artist, setArtist] = useState({
    artistName: '',
  });
  // console.log(props);
  const onChange = (e) => {
    setArtist({ ...artist, [e.target.name]: e.target.value });
  };
  // console.log(artist.artistName);
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

export default AddArtist;
