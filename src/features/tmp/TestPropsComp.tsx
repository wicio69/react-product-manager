import 'react';

interface PersonProps {
  firstName: string;
  lastName: string;
}

interface PersonObjectProps {
  person: {
    firstName: string;
    lastName: string;
  };
}

function ParentComponent() {
  const person = { firstName: 'John', lastName: 'Wiseau' };
  return (
    <>
      <ChildComponent firstName={person.firstName} lastName={person.lastName} />
      <ChildComponentDestructure
        firstName={person.firstName}
        lastName={person.lastName}
      />
      <ChildWithObject person={person} />
    </>
  );
}

function ChildComponent(props: PersonProps) {
  return <>{props.firstName};</>;
}

function ChildComponentDestructure({ firstName }: PersonProps) {
  return <>{firstName}</>;
}

function ChildWithObject(props: PersonObjectProps) {
  return <>{props.person.firstName}</>;
}
