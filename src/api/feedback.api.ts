/** Core */


/** API */
import { api } from '../lib';

/** Interfaces */
import { IUser } from '../interfaces';

async function sendFeedback(message: string, feedback: string, user: IUser) {
  try {
    await api.post('/feedback', { message, feedback, user });
    return 'Obrigado pelo feedback!';
  } catch {
    return 'Ocorreu um erro ao enviar o feedback, tente novamente mais tarde.';
  }
}

export const feedbackApi = { sendFeedback };
