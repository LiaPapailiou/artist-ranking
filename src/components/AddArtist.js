import React from 'react'

const AddArtist = (props) => {
  console.log(props);
  return (
    <div>
      <input type="text" placeholder="Artist Name (required)" required onSubmit={(e) => props.artistName(e.target.value)} />
    </div>
  )
}

export default AddArtist
