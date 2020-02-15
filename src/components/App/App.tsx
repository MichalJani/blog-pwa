import React from 'react';
import { CustomForm, InviteFriendsForm } from '../Forms';
import './App.css';

export const App = () => {
  return (
    <div className="App">
      <CustomForm />
      <br />
      <InviteFriendsForm />
    </div>
  );
};
