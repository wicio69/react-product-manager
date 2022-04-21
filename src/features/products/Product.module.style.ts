import { css } from '@emotion/react';

const primary = css({ color: '#1876D1' });

const hotpink = css({
  color: 'hotpink',
});

export const tableWrapper = css({
  marginTop: '100px',
  width: '92%',
  overflow: 'hidden',
  minHeight: '100vh',
});

export const tableContainer = css({
  maxHeight: '1000px',
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

export const deleteIcon = css({
  color: '#1876D1',
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
  cursor: 'pointer',
  '&:hover,&:focus': primary,
});

export const formAlert = css({
  marginTop: '15px',
});
