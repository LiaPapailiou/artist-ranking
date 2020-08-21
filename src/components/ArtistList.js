import React from 'react';
import { useHistory, Link } from 'react-router-dom';
// import { Link } from 'react-router';

const ArtistList = (props) => {
  const history = useHistory();
  const { artist } = props;
  console.log(artist);
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
              return (
                <tr key={Math.floor(Math.random() * 50) + 1} style={{ listStyleType: 'none' }}>
                  <td style={{ paddingRight: '2em', paddingLeft: '2em', paddingBottom: '1em' }}>
                    <Link to={`/${item.id}`} >
                      {item.artistName}
                    </Link>
                  </td>
                  <td style={{ paddingRight: '2em', paddingLeft: '2em', paddingBottom: '1em' }}>
                    {item.artistStars} ⭐️
                </td>
                  <td style={{ paddingRight: '1em', paddingLeft: '2em', paddingBottom: '1em' }} >
                    <button type="button"> + </button>
                    <button type="button"> - </button>
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>

    </div>
  )
}

export default ArtistList;