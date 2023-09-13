/** API */
import { api } from '../lib';

/** Interfaces */
import { IMessage } from '../interfaces';

async function getMessages() {
  try {
    const response = await api.get('/messages');
    const messages = response.data;

    return messages;
  } catch {
    return [];
  }
}

async function sendMessage(message: IMessage) {
  try {
    const response = await api.post('/messages', { message });
    const newMessages = response.data;

    return newMessages;
  } catch {
    const newMessage = {
      content: 'Você está falando com a API do SoulCoderz! Seus créditos estão zerados :(',
      role: 'assistant',
    };

    return newMessage;
  }
}

export const messageApi = { getMessages, sendMessage };
