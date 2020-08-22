import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import shortid from 'shortid';
const ArtistList = (props) => {
  const [sortedField, setSortedField] = useState(null);
  const { artist } = props;
  const sorted = [...artist]
  useMemo(() => {
    sorted.map((item) => {
      if (item.id === 0) {
        sorted.shift(item);
      }
    })
    if (sortedField !== null) {
      sorted.sort((a, b) => a.artistStars > b.artistStars ? -1 : 1);
    };
    setSortedField(sorted);
    return sorted;
  }, [artist]);

  console.log('SORTED:', sortedField);
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
          {Array.isArray(sortedField) && sortedField.map((item) => {
            if (item.id > 0) {
              return (
                <tr key={shortid.generate()} style={{ listStyleType: 'none' }}>
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

