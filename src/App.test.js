import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { render, screen } from '@testing-library/react';

it('renders without crashing', () => {
  render(<App />);
});

