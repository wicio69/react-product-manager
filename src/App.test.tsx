import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './util/store';
import App from './App';

test('renders recruitment text', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(getByText(/Bartek Gościcki - Recruitment Task/i)).toBeInTheDocument();
});
