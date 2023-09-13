/** Core */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

/** Interface */
import { IUser } from '../interfaces';

const initialState: IUser = {
  username: '',
  name: '',
  surName: '',
  email: '',
  password: '',
};

export const userSlice = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      const { email, name, password, surName, username } = action.payload;
      state.email = email;
      state.name = name;
      state.password = password;
      state.surName = surName;
      state.username = username;
    },
  },
});

export const { setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
