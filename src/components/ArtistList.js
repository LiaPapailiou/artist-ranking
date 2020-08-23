import React, { useState, useMemo, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import ArtistContext from '../ArtistContext';

const ArtistList = (props) => {
  const [sortedArtist, setSortedArtist] = useState(null);
  const context = useContext(ArtistContext);
  const { state } = context;
  const { artist } = state;
  const sorted = [...artist];

  useMemo(() => {
    sorted.map((item) => {
      if (item.id === 0) {
        sorted.shift(item);
      }
      return item;
    });
    sorted.sort((a, b) => (a.artistStars > b.artistStars ? -1 : 1));
    setSortedArtist(sorted);
    return sorted;
  }, [artist]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th aria-label="Artist Photo" style={{ padding: '2em' }} />
            <th style={{ padding: '2em' }}>Artist Name</th>
            <th style={{ padding: '2em' }}>Artist Rating</th>
            <th style={{ padding: '2em' }}>Vote</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(sortedArtist)
            && sortedArtist.filter((item) => item.id > 0).map((item) => (
              <tr key={shortid.generate()}>
                <td>
                  {
                    item.artistPhoto
                    && <img src={item.artistPhoto} alt="" style={{ height: 30, width: 30 }} />
                  }
                </td>
                <td style={{ paddingRight: '2em', paddingLeft: '2em', paddingBottom: '1em' }}>
                  <Link to={`/artist/${item.id}`}>
                    {item.artistName}
                  </Link>
                </td>
                <td style={{ paddingRight: '2em', paddingLeft: '2em', paddingBottom: '1em' }}>
                  {item.artistStars} ⭐️
                </td>
                <td style={{ paddingRight: '1em', paddingLeft: '2em', paddingBottom: '1em' }}>
                  <button type="button" onClick={() => props.onIncClick(item.id)}>
                    +
                  </button>
                  <button type="button" onClick={() => props.onDecClick(item.id)}>
                    -
                  </button>
                </td>
              </tr>
            ))},
        </tbody>
      </table>
    </div>
  );
};

ArtistList.propTypes = {
  onIncClick: PropTypes.func.isRequired,
  onDecClick: PropTypes.func.isRequired,
};

export default ArtistList;
