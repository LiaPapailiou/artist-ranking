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
      <table className="table">
        <thead>
          <tr>
            <th aria-label="Artist Photo" />
            <th>Artist Name</th>
            <th>Artist Rating</th>
            <th>Vote</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(sortedArtist)
            && sortedArtist.filter((item) => item.id > 0).map((item) => (
              <tr key={shortid.generate()}>
                <td>
                  {
                    item.artistPhoto
                    && <img src={item.artistPhoto} alt="" style={{ height: 30, width: 30, paddingTop: '0.5em' }} />
                  }
                </td>
                <td>
                  <Link to={`/artist/${item.id}`}>
                    {item.artistName}
                  </Link>
                </td>
                <td>
                  {item.artistStars} ⭐️
                </td>
                <td>
                  <button type="button" className="btn-i" onClick={() => props.onIncClick(item.id)}>
                    <i className="fas fa-chevron-up" style={{ color: '#11998e' }} />
                  </button>
                  <button type="button" className="btn-i" onClick={() => props.onDecClick(item.id)}>
                    <i className="fas fa-chevron-down" style={{ color: '#11998e' }} />
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
