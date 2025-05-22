import React from 'react';
import HomePage from './home';
import RequiresAuth from '@/components/RequiresAuth';

export default function Index() {
  return <RequiresAuth redirect={'/about'}>{(user) => <HomePage user={user} />}</RequiresAuth>;
}
