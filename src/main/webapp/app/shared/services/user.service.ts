import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
// import { IUser } from '../model/app-user.model';
import { IUser } from '../model/user.model';

const apiUrl = '/api/admin/users';

const USE_MOCK = true;

const MOCK_USERS: IUser[] = [
  {
    id: 1,
    login: 'admin',
    email: 'admin@example.com',
    firstName: 'Admin',
    lastName: 'User',
    authorities: ['ROLE_ADMIN'],
    activated: true,
    createdDate: '2024-01-01',
  },
  {
    id: 2,
    login: 'staff1',
    email: 'staff@example.com',
    firstName: 'Staff',
    lastName: 'Member',
    authorities: ['ROLE_STAFF'],
    activated: true,
    createdDate: '2024-02-01',
  },
  {
    id: 3,
    login: 'user1',
    email: 'user1@example.com',
    firstName: 'John',
    lastName: 'Doe',
    authorities: ['ROLE_USER'],
    activated: true,
    createdDate: '2024-03-01',
  },
  {
    id: 4,
    login: 'user2',
    email: 'user2@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    authorities: ['ROLE_USER'],
    activated: true,
    createdDate: '2024-04-01',
  },
];

// Get all users (Admin only)
export const getUsers = createAsyncThunk(
  'user/fetch_all',
  async ({ page = 0, size = 20, sort = 'id,asc' }: { page?: number; size?: number; sort?: string } = {}) => {
    if (USE_MOCK) {
      return new Promise<any>(resolve => {
        setTimeout(() => {
          resolve(MOCK_USERS);
        }, 400);
      });
    }
    const response = await axios.get<any>(apiUrl, {
      params: { page, size, sort },
    });
    return response.data;
  },
);

// Get user by ID
export const getUser = createAsyncThunk('user/fetch_entity', async (login: string) => {
  if (USE_MOCK) {
    return new Promise<IUser>(resolve => {
      setTimeout(() => {
        const user = MOCK_USERS.find(u => u.login === login);
        resolve(user || MOCK_USERS[0]);
      }, 300);
    });
  }
  const response = await axios.get<IUser>(`${apiUrl}/${login}`);
  return response.data;
});

// Create user (Admin only)
export const createUser = createAsyncThunk('user/create_entity', async (user: IUser) => {
  if (USE_MOCK) {
    return new Promise<IUser>(resolve => {
      setTimeout(() => {
        const newUser = { ...user, id: MOCK_USERS.length + 1 };
        MOCK_USERS.push(newUser);
        resolve(newUser);
      }, 400);
    });
  }
  const response = await axios.post<IUser>(apiUrl, user);
  return response.data;
});

// Update user (Admin only)
export const updateUser = createAsyncThunk('user/update_entity', async (user: IUser) => {
  if (USE_MOCK) {
    return new Promise<IUser>(resolve => {
      setTimeout(() => {
        const index = MOCK_USERS.findIndex(u => u.login === user.login);
        if (index !== -1) {
          MOCK_USERS[index] = user;
        }
        resolve(user);
      }, 400);
    });
  }
  const response = await axios.put<IUser>(`${apiUrl}/${user.login}`, user);
  return response.data;
});

// Delete user (Admin only)
export const deleteUser = createAsyncThunk('user/delete_entity', async (login: string) => {
  if (USE_MOCK) {
    return new Promise<{ login: string }>(resolve => {
      setTimeout(() => {
        const index = MOCK_USERS.findIndex(u => u.login === login);
        if (index !== -1) {
          MOCK_USERS.splice(index, 1);
        }
        resolve({ login });
      }, 400);
    });
  }
  await axios.delete(`${apiUrl}/${login}`);
  return { login };
});

// Get current user info
export const getCurrentUser = createAsyncThunk('user/fetch_current', async () => {
  if (USE_MOCK) {
    return new Promise<IUser>(resolve => {
      setTimeout(() => {
        resolve(MOCK_USERS[0]);
      }, 300);
    });
  }
  const response = await axios.get<IUser>('/api/account');
  return response.data;
});

// Update current user profile
export const updateCurrentUser = createAsyncThunk('user/update_current', async (user: Partial<IUser>) => {
  if (USE_MOCK) {
    return new Promise<IUser>(resolve => {
      setTimeout(() => {
        resolve({ ...MOCK_USERS[0], ...user } as IUser);
      }, 400);
    });
  }
  const response = await axios.post<IUser>('/api/account', user);
  return response.data;
});

// Search users by keyword
export const searchUsers = createAsyncThunk('user/search', async (keyword: string) => {
  if (USE_MOCK) {
    return new Promise<IUser[]>(resolve => {
      setTimeout(() => {
        const filtered = MOCK_USERS.filter(
          u => u.login?.includes(keyword) || u.email?.includes(keyword) || u.firstName?.includes(keyword) || u.lastName?.includes(keyword),
        );
        resolve(filtered);
      }, 300);
    });
  }
  const response = await axios.get<IUser[]>(`${apiUrl}/search`, {
    params: { query: keyword },
  });
  return response.data;
});

// Get users by role
export const getUsersByRole = createAsyncThunk('user/fetch_by_role', async (role: string) => {
  if (USE_MOCK) {
    return new Promise<IUser[]>(resolve => {
      setTimeout(() => {
        const filtered = MOCK_USERS.filter(u => u.authorities?.includes(role));
        resolve(filtered);
      }, 300);
    });
  }
  const response = await axios.get<IUser[]>(`${apiUrl}/role/${role}`);
  return response.data;
});
