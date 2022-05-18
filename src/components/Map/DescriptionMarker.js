import React from 'react';

import './DescriptionMarker.css';

export default function DescriptionMarker(props) {
  return (
    <div
      className={`marker ${props.selected ? 'selected' : null}`}
    >{`$${props.name}`}</div>
  );
}
