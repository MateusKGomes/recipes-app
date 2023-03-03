import React, { useEffect } from 'react';
import Header from './Header';

function Drinks() {
  useEffect(() => {
    document.title = 'Drinks';
  }, []);

  return (
    <div>
      <Header />
    </div>
  );
}

export default Drinks;
