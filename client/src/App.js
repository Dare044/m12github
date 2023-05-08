import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import PersonalsList from './features/personals/PersonalsList'
import EditPersonal from './features/personals/EditPersonal'
import EditPersonalList from './features/personals/EditPersonalForm'
import NewPersonalForm from './features/personals/NewPersonalForm'
import React, { Component }  from 'react';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<DashLayout />} />
        <Route path="dash" element={<DashLayout />}>
          <Route index element={<Welcome />} />
          <Route path="personals">
            <Route index element={<PersonalsList />} />
            <Route path=":id" element={<EditPersonal />} />
            <Route path="new" element={<NewPersonalForm />} />
          </Route>
          </Route>
      </Route>
    </Routes>
  );
}

export default App;
