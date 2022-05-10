import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './util/store';
import App from './App';
import userEvent from '@testing-library/user-event';

test('renders recruitment text', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(getByText(/Bartek Gościcki - Recruitment Task/i)).toBeInTheDocument();
});

test('searchbar is initially empty', () => {
  const { getByRole } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const searchbar = getByRole('textbox') as HTMLInputElement;
  expect(searchbar.value).toBe('');
});

test('should be able to type in product name', () => {
  const { getByRole } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const searchbar = getByRole('textbox') as HTMLInputElement;
  userEvent.type(searchbar, 'test-product');
  expect(searchbar.value).toBe('test-product');
});
