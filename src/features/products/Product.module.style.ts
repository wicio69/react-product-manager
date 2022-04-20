import { css } from '@emotion/react';

export const tableWrapper = css({
  marginTop: '100px',
  width: '100%',
  overflow: 'hidden',
  minHeight: '100vh',
});

export const tableContainer = css({
  maxHeight: '550px',
});

export const searchBar = css({
  width: '100%',
  marginBottom: '10px',
  marginLeft: '10px',
});

export const iconButton = css({
  cursor: 'pointer',
  color: '#2979ff',
});

export const datePicker = css({
  width: '100%',
  marginTop: '15px',
});

const hotpink = css({
  color: 'hotpink',
});

export const deleteIcon = css({
  color: '#BEBEBE',
  cursor: 'pointer',
  '&:hover,&:focus': hotpink,
});

export const editIcon = css({
  color: '#1876D1',
  cursor: 'pointer',
  '&:hover,&:focus': hotpink,
});

export const addButton = css({
  marginTop: '15px',
});

export const tableHeader = css({
  fontWeight: 'bold',
});

export const formAlert = css({
  marginTop: '15px',
});
