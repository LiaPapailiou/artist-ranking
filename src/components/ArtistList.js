import React from 'react'

const ArtistList = (props) => {
  const { artist } = props;
  console.log(artist)
  return (
    <div>{Array.isArray(artist) && artist.map((item, idx) => {
      if (idx > 0) {
        return (<ul key={idx} style={{ listStyleType: 'none' }}>
          <li> {item.artistName} {item.artistStars}</li>
        </ul>)
      }
    })}</div>
  )
}

export default ArtistList