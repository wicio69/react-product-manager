import { render, act, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './util/store';
import App from './App';
import userEvent from '@testing-library/user-event';

/**
 * This is needed to avoid unexpected behaviour caused by
 * MaterialUI's Datepicker being rendered in mobile mode by default.
 */
beforeEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string): MediaQueryList => ({
      media: query,
      matches: query === '(pointer: fine)',
      onchange: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }),
  });
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});

test('renders recruitment text', () => {
  expect(
    screen.getByText(/Bartek Gościcki - Recruitment Task/i)
  ).toBeInTheDocument();
});

test('searchbar is initially empty', () => {
  const searchbar = screen.getByRole('textbox') as HTMLInputElement;
  expect(searchbar.value).toBe('');
});

test('should be able to type in product name', () => {
  const searchbar = screen.getByRole('textbox') as HTMLInputElement;
  userEvent.type(searchbar, 'test-product');
  expect(searchbar.value).toBe('test-product');
});

test('renders add product popup', () => {
  const addButton = screen.getByText(/Add a new product/i) as HTMLInputElement;
  userEvent.click(addButton);
  expect(
    screen.getByText(/In order to add a new product./i)
  ).toBeInTheDocument();
});

test('should be able to add product', async () => {
  const addButton = screen.getByText(/Add a new product/i) as HTMLInputElement;

  userEvent.click(addButton);

  const saveButton = screen.getByRole('button', {
    name: /save/i,
  }) as HTMLInputElement;

  const nameField = screen.getByRole('textbox', {
    name: /name/i,
  }) as HTMLInputElement;

  const emailField = screen.getByRole('textbox', {
    name: /email/i,
  }) as HTMLInputElement;

  const descriptionField = screen.getByRole('textbox', {
    name: /description/i,
  }) as HTMLInputElement;

  const quantityField = screen.getByLabelText(/quantity/i) as HTMLInputElement;

  const dateField = screen.getByRole('textbox', {
    name: /date/i,
  }) as HTMLInputElement;

  userEvent.type(nameField, 'TestBand - TestAlbum');
  userEvent.type(emailField, 'testBand@testAlbum.com');
  userEvent.type(descriptionField, 'Test genre.');
  userEvent.type(quantityField, '350');
  userEvent.type(dateField, '01/01/2022');

  expect(nameField.value).toBe('TestBand - TestAlbum');
  expect(emailField.value).toBe('testBand@testAlbum.com');
  expect(descriptionField.value).toBe('Test genre.');
  expect(quantityField.value).toBe('350');
  expect(dateField.value).toBe('01/01/2022');

  act(() => userEvent.click(saveButton));

  expect(await screen.findByRole('alert')).toBeInTheDocument();
});
