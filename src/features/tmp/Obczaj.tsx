import react from 'react';

interface APIResponse {
  people: Person[];
}

interface Person {
  id: number;
  age: number;
  firstName: string;
}

export function Parent(): JSX.Element {
  const apiReponse: APIResponse = {
    people: [
      {
        id: 2,
        age: 12,
        firstName: 'Bartek',
      },
    ],
  };

  return (
    <>
      <Obczaj {...apiReponse} />
    </>
  );
}

export function Obczaj(people: APIResponse): JSX.Element {
  return <div></div>;
}
