import { useRef, useState } from 'react';

// 'useRef' to po prostu "przechowaj wartość pomiędzy rerenderami". Zachowaj referencję.
export function UseRefExample() {
  const [state, setState] = useState(1);

  // W tym przypadku wartość tej zmiennej będzie resetowana do zera po kazdym rerenderze:
  const plainObject = { firstName: 'Plain Object' };

  // W tym przypadku wartość obiektu (domślnie podany w jako parametr useRef) będzie zapamiętywany. Dostępny przez objectReference.current.
  const objectReference = useRef({ firstName: 'Reference Object' });

  const updateState = () => {
    plainObject.firstName = plainObject.firstName.concat('a');
    objectReference.current.firstName =
      objectReference.current.firstName.concat('a');
    setState(state + 1);
  };

  // Działa to więc podobnie jak useState, ale sama zmiana wartości useRef NIE POWODUJE RE-RENDERU!

  // useRef moze wiec słuzyc jako licznik re-renderów. To samo mozna osiagnac z useState (i nigdzie nie zmieniac tego stanu).
  console.log(objectReference);
  return (
    <div>
      <button onClick={() => updateState()}>Change State</button>
      <p>{state}</p>
      <p>{plainObject.firstName}</p>
      <p>{objectReference.current.firstName}</p>
    </div>
  );
}

/*
        REAL LIFE przykład:
        Licznik re-renderów. Jakbym chciał "mutować" potem te wartość, to mogę to spokojnie robić bez obawy
        ze coś mi się ponownie wyrenderuje, a nie będę tego chciał.
*/
