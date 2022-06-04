import { useMemo, useState, memo } from 'react';

// React hook "useState" cannot be called at the top level. React Hooks MUST be called in a React function component or a custom React hook.
// const [stateOutside, setStateOutside] = useState<number>(2);
// O React memo mozna myslec jako 'render if they props have changed'.
// "This serves ONLY optimization, do not use it to try and prevent re-renders".

// useMemo ma sens, gdy podajesz obiekty bądź tablice, które są pass by reference.

function Swatch({ color }: any) {
  console.log(`Swatch rendered with ${color}`);
  return (
    <div
      style={{
        margin: 75,
        width: 75,
        height: 75,
        backgroundColor: color,
      }}
    ></div>
  );
}

// W przypadku komponentu "memoized" porównywane są propsy "stare" i "nowe" i jezeli okazą się równe, to dopiero wtedy dochodzi do re-renderu.
const MemoizedSwatch = memo(Swatch);

export function Check() {
  console.log('Beginning to render the Check component...');
  // const fn = () => {
  //   console.log('Called...');
  //   return [];
  // };
  // const [state, setState] = useState(fn());
  // console.log(state);
  // return <div>Hello there</div>;
}

export function TmpComponentUseMemo() {
  console.log(`Parent component rendered`);
  const [color, setColor] = useState<string>('red');
  const [state, setState] = useState<number>(1);
  const [bigArray, setBigArray] = useState<Array<number>>(
    Array.from(Array(10).keys())
  );

  // Funkcja, która zajmuje długo:
  const heavyFoo = (): string => {
    setTimeout(() => console.log('Coś długo robię asynchronicznie...'), 15000);
    return color.concat('-rerendered');
  };

  // useMemo. Oblicz i wyrenderuj (bo jest w HTMLu) tylko jezeli zmieni się state coloru:
  const value = useMemo(() => {
    return heavyFoo();
  }, [color]);

  /*   
    UseMemo zapobiega ponownemu renderowaniu komponentu za kazdym razem, gdy na przykład zmieni się stan parent-componentu.
    Sprzyja to głównie optymalizacji komponentów.
  */
  // const memoizedValue = useMemo()

  return (
    <div>
      {value}
      <button
        onClick={() => {
          setState(state + 1);
          console.log(state);
        }}
      >
        Change state / Force re-render
      </button>
      <button
        onClick={() => {
          color === 'red' ? setColor('blue') : setColor('red');
        }}
      >
        Change color
      </button>
      {/* <Swatch color={color} /> */}
      <MemoizedSwatch color={color} />
      {/* <Check /> */}
    </div>
  );
}
