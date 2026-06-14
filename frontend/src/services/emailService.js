import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

export const sendFeedbackEmail = async (feedbackData) => {
  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
    throw new Error(
      'EmailJS не настроен. Проверь REACT_APP_EMAILJS_SERVICE_ID, REACT_APP_EMAILJS_TEMPLATE_ID и REACT_APP_EMAILJS_PUBLIC_KEY'
    );
  }

  const templateParams = {
    request_id: feedbackData.id || Date.now(),
    from_name: feedbackData.name || 'Не указано',
    from_phone: feedbackData.phone || 'Не указан',
    from_email: feedbackData.email || 'Не указан',
    subject: feedbackData.subject || 'Без темы',
    message: feedbackData.message || 'Без сообщения',
    preferred_contact: feedbackData.preferred_contact || 'Не указан',
    created_at: feedbackData.created_at || new Date().toLocaleString('ru-RU'),
    site_name: 'RAF-52 Coffee',
  };

  return emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    templateParams,
    {
      publicKey: EMAILJS_PUBLIC_KEY,
    }
  );
};