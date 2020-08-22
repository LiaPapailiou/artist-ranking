import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import shortid from 'shortid';

const ArtistList = (props) => {
  const [sortedArtist, setSortedArtist] = useState(null);
  const { artist } = props;
  const sorted = [...artist];

  useMemo(() => {
    sorted.sort((a, b) => a.artistStars > b.artistStars ? -1 : 1);
    setSortedArtist(sorted);
    return sorted;
  }, [artist]);

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
          {Array.isArray(sortedArtist) && sortedArtist.map((item) => {
            if (item.id > 0) {
              return (
                <tr key={shortid.generate()}>
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

