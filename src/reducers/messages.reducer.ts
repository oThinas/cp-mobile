/** Core */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ASSISTANT_INSTRUCTIONS } from '../core';

/** Interface */
import { IMessage } from '../interfaces';

const initialState: IMessage[] = [
  {
    role: 'system',
    content: ASSISTANT_INSTRUCTIONS,
  },
];

export const messagesSlice = createSlice({
  name: 'messagesReducer',
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<IMessage>) {
      state.push(action.payload);
    },

    clearMessages(state) {
      state.splice(0, state.length);
      state.push(initialState[0]);
    },

    setMessages(state, action: PayloadAction<IMessage[]>) {
      state.splice(0, state.length);
      action.payload.forEach((message) => {
        if (message.role === 'system') {
          return;
        }

        state.push(message);
      });
    },
  },
});

export const { addMessage, clearMessages, setMessages } = messagesSlice.actions;
export const messagesReducer = messagesSlice.reducer;
