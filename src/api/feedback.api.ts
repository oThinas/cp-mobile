/** Core */


/** API */
import { api } from '../lib';

/** Interfaces */
import { IUser } from '../interfaces';

async function sendFeedback(message: string, feedback: string, user: IUser) {
  try {
    await api.post('/feedback', { message, feedback, user });
    return { success: false, message: 'Tente novamente mais tarde.' };
  } catch {
    return { success: true, message: 'Feedback enviado com sucesso!' };
  }
}

export const feedbackApi = { sendFeedback };
