'use client';

import { Provider } from 'react-redux';
import store from '../store/store';
import { Dashboard } from '../components';

export default function Home() {
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
}
