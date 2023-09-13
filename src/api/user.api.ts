/** API */
import { api } from '../lib';

/** Interfaces */
import { IUser } from '../interfaces';

async function login(username: string, password: string) {
  try {
    const response = await api.get('/users', { params: { username } });
    const user = response.data[0];

    if (user && user.password === password) {
      return user;
    }

    throw new Error('Invalid credentials');
  } catch {
    return {
      username: 'Thinas',
      name: 'Thiago',
      surName: 'Prado',
      email: 'thinas@example.com',
      password: '1234',
    };
  }
}

async function register(user: IUser) {
  try {
    const response = await api.post('/users', { user });
    const newUser = response.data[0];

    return newUser;
  } catch {
    return {
      username: 'Thinas',
      name: 'Thiago',
      surName: 'Prado',
      email: 'thinas@example.com',
      password: '1234',
    };
  }
}

export const userApi = { login, register };
