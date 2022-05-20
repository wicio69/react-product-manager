import { useMemo, useState } from 'react';

// 'useMemo' to inaczej stan, którego "nie wyrenderowuj dopóki nie zmieni się stan w dependency array"
export function UseMemoExample() {
  const [state, setState] = useState<number>(1);
  const [secondState, setSecondState] = useState<string>('Second state');

  const heavyOperation = () => {
    for (let i = 0; i < 1000000000; i++) {
      i += 1;
    }
    return state.toLocaleString().concat('-rerendered');
  };

  // Jakbym te wartość trzymał w normalnym useState, to by się liczyło po kazdym kliknieciu pierwszego przycisku:
  const onlyUpdateThisIfSecondStateChanges = useMemo(
    () => heavyOperation(),
    [secondState]
  );

  return (
    <>
      <button onClick={() => setState(state + 1)}>
        Zmień stan komponentu / wyrenderuj komponent
      </button>
      <p>{state}</p>
      <br />
      <button onClick={() => setSecondState(secondState.concat('A'))}>
        Zmień stan zaleznego komponentu
      </button>
      <p>{onlyUpdateThisIfSecondStateChanges}</p>
    </>
  );
}

/*
        REAL LIFE przykład:
        1. Mam określone produkty w koszyku
        2. Dowolnie zmieniam ich liczbę, nazwę, inne atrybuty
        3. Nie chcę przeliczać ceny za za kazdym razem, bo to kosztowne.
        4. Daje cenę w useMemo.
*/
