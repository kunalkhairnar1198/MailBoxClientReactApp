import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from './App';
import { store } from './Store/Store';

test('renders learn react link', () => {
  render(
    <Provider store={store}>
    <Router>
    <App />
    </Router>
    </Provider>
);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
