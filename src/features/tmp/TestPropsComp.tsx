import react from 'react';

interface PersonProps {
  firstName: string;
  lastName: string;
}
interface Person {
  person: {
    firstName: string;
    lastName: string;
  };
}

type Movie = { title: string; releaseDate: number };

interface APIResponse {
  id: number;
  firstName: string;
  lastName: string;
  favMovies: Movie[];
}

interface GenericObjectType<GenericAgeFormat> {
  firstName: string;
  age: GenericAgeFormat;
}

export function ParentComponent(): JSX.Element {
  const person = { firstName: 'John', lastName: 'Wiseau' };

  const apiResponse = {
    id: 1,
    firstName: 'Johnny',
    lastName: 'Christensen',
    favMovies: [
      {
        title: 'Titanic',
        releaseDate: 2000,
      },
      {
        title: 'Eraserhead',
        releaseDate: 1977,
      },
    ],
  };

  return (
    <>
      <ChildComponent firstName={person.firstName} lastName={person.lastName} />
      <ChildComponentDestructure
        firstName={person.firstName}
        lastName={person.lastName}
      />
      <TestChildComponent person={person} />
      <ChildWithObject person={person} />
      <ChildWithGenericObject firstName="Tommy" age="21" />
      <GenericComponent {...apiResponse} />
    </>
  );
}

// Czyli takiemu komponentowi muszę dostarczyć:
// <ChildComponent firstName={} lastName={}/>
// Ale mogę podać jako spread operator:
// person = {firstName: 'John', lastName: 'Wiseau} i potem:
// <ChildComponent {...person}/>
function ChildComponent(props: PersonProps) {
  return (
    <>
      {props.firstName};<br></br>
    </>
  );
}

// Czyli takiemu komponentowi muszę dostarczyć:
// <TestChildComponent person={firstName: 'a', lastname: 'b'}:
function TestChildComponent({ person }: Person) {
  console.log(person);
  return <div></div>;
}

function ChildComponentDestructure({ firstName }: PersonProps): JSX.Element {
  return (
    <>
      {firstName}
      <br />
    </>
  );
}

function ChildWithObject(props: Person) {
  return (
    <>
      {props.person.firstName}
      <br />
    </>
  );
}

// Generyczny komponent z generycznym propsem:
function ChildWithGenericObject(obj: GenericObjectType<string>) {
  return (
    <>
      {obj.age}, {obj.firstName} <br />
    </>
  );
}

// Get a list of keys: Object.keys(TUTAJ DOPIERO PODAJ OBJECT)

// Generyczny komponent, dzięki czemu mogę tworzyć generyczne zmienne w jego wnętrzu:
function APIComponent(person: APIResponse): JSX.Element {
  return <>{JSON.stringify(person)}</>;
}

function GenericComponent<T>(object: T): JSX.Element {
  return <>{JSON.stringify(object)}</>;
}

const abc = { firstName: 'siema', lastName: 'elo' };

for (let key in abc) {
}
