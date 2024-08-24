import React from 'react';
import { useWindowWidth } from './components/context/WindowWidthContext'; // Adjust path as necessary

const SomeComponent = () => {
  const { isSmallerDevice } = useWindowWidth();

  return (
    <div>
      {isSmallerDevice ? 'This is a small device' : 'This is not a small device'}
    </div>
  );
};

export default SomeComponent;
