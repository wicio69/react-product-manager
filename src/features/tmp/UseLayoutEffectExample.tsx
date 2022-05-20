import { useLayoutEffect, useEffect, useState } from 'react';

// 'useLayoutEffect'
export function UseLayoutEffectExample() {
  useEffect(() => {
    console.log('Use effect.');
  });

  useLayoutEffect(() => {
    console.log('Use layout effect.');
  });

  return (
    <>
      <div>Hi, check the console.</div>
    </>
  );
}

/*
        REAL LIFE przykład:
*/
