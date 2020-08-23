import React, { useState, useMemo, useContext } from 'react';
import { Link } from 'react-router-dom';
import shortid from 'shortid';
import ArtistContext from '../ArtistContext';

const ArtistList = (props) => {
  const [sortedArtist, setSortedArtist] = useState(null);
  const context = useContext(ArtistContext);
  const sorted = [...context.state.artist];

  useMemo(() => {
    sorted.map((item) => {
      if (item.id === 0) {
        sorted.shift(item);
      }
    })
    sorted.sort((a, b) => a.artistStars > b.artistStars ? -1 : 1);
    setSortedArtist(sorted);
    return sorted;
  }, [context.state.artist]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th style={{ padding: '2em' }}></th>
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
                  <td>
                    {item.artistPhoto && <img src={item.artistPhoto} style={{ height: 40, width: 40 }}></img>}
                  </td>
                  <td style={{ paddingRight: '2em', paddingLeft: '2em', paddingBottom: '1em' }}>
                    <Link to={`/artist/${item.id}`} id={item.id}>
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

