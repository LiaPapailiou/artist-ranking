import React from 'react'

const ArtistList = (props) => {
  const { artist } = props;
  console.log(artist)
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th style={{ padding: '2em' }}>Artist Name</th>
            <th style={{ padding: '2em' }}>Artist Rating</th>
            <th style={{ padding: '2em' }}>Vote</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(artist) && artist.map((item, idx) => {
            if (idx > 0) {
              return (<tr key={idx} style={{ listStyleType: 'none' }}>
                <td style={{ paddingRight: '2em', paddingLeft: '2em', paddingBottom: '1em' }}>{item.artistName}</td>
                <td style={{ paddingRight: '2em', paddingLeft: '2em', paddingBottom: '1em' }}>{item.artistStars} ⭐️ </td>
                <td style={{ paddingRight: '1em', paddingLeft: '2em', paddingBottom: '1em' }} > <button>+</button><button>-</button></td>
              </tr>)
            }
          })}
        </tbody>
      </table>

    </div>
  )
}

export default ArtistList