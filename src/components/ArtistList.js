import React from 'react';
import { Link } from 'react-router-dom';

const ArtistList = (props) => {
  const { artist } = props;
  // console.log(count);
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
                    <Link to={`/artist/${item.id}`}>
                      {item.artistName}
                    </Link>
                  </td>
                  <td style={{ paddingRight: '2em', paddingLeft: '2em', paddingBottom: '1em' }}>
                    {item.artistStars} ⭐️
                  </td>
                  <td style={{ paddingRight: '1em', paddingLeft: '2em', paddingBottom: '1em' }}>
                    <button type="button" onClick={() => {
                      props.onIncClick(item.id);
                    }}> + </button>
                    <button type="button" onClick={() => {
                      props.onDecClick(item.id);
                    }}> - </button>
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ArtistList;

