import { observer } from 'mobx-react-lite';
import React, {FC, useContext} from 'react';
import {Context} from '../index';

const LoginForm: FC = () => {
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const {store} = useContext(Context);

    return (
        <div>
            <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                type='text'
                placeholder='Email'
            />
            <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                type='pasword'
                placeholder='Password'
            />
            <button onClick={() => {store.login(email, password)}}>Login</button>
            <button onClick={() => store.registration(email, password)}>Registration</button>
        </div>
    );
};

export default observer(LoginForm);

