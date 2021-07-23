import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { Context } from '.';
import LoginForm from './components/LoginForm';
import { IUser } from './models/IUser';
import UserService from './service/UserService';


const App: FC = () => {
  const {store} = React.useContext(Context);

  const [users, setUsers] = React.useState<IUser[]>([])

  React.useEffect(() => {
    if(localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, []);

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data)
    } catch(e) {
      console.log(e);
    }
  }

  if(store.isLoading) {
    return <div>Loading...</div>
  }

  if(!store.isAuth) {
    return (
      <div>
        <button onClick={getUsers}>
            Get user list
        </button>
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <h1>{store.isAuth ? `User is auth ${store.user.email}` : 'Authorized!'}</h1>
      <h1>{store.user.isActivated ? 'Account was activated by email' : 'Acoount not activated, pls activate by email'}</h1>
      <button onClick={() => store.logout()}>Exit</button>
      <div>
        <button onClick={getUsers}>
            Get user list
        </button>
      </div>
      {users.map(user => 
        <div key={user.email}>{user.email}</div>  
      )}
    </div>
  )
}

export default observer(App);
