import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login'
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import NotesList from './features/notes/NotesList'
import UsersList from './features/users/UsersList'
import PersonalsList from './features/personals/PersonalsList'
import EditPersonal from './features/personals/EditPersonal'
import EditPersonalList from './features/personals/EditPersonalForm'
import NewPersonalForm from './features/personals/NewPersonalForm'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        <Route path="dash" element={<DashLayout />}>
          <Route index element={<Welcome />} />
          <Route path="notes">
            <Route index element={<NotesList />} />
          </Route>
          <Route path="users">
            <Route index element={<UsersList />} />
          </Route>
          <Route path="personals">
            <Route index element={<PersonalsList />} />
            <Route path=":id" element={<EditPersonal />} />
            <Route path="new" element={<NewPersonalForm />} />
          </Route>
          </Route> {/* End Dash */}
      </Route>
    </Routes>
  );
}

export default App;
