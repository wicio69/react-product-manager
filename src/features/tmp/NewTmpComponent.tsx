import React from 'react';

interface TableProps<T> {
  item: T;
  renderItem: (item: T) => React.ReactNode;
}

export const Table = <T,>(args: TableProps<T>) => {
  return null;
};

export const Component = () => {
  return (
    <>
      <Table
        item={['siema', 'jeden']}
        renderItem={(item) => {
          return <div>{item}</div>;
        }}
      ></Table>
    </>
  );
};
