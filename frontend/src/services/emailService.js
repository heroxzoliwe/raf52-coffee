import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = 'service_4ktseps';
const EMAILJS_TEMPLATE_ID = 'template_lu8rmm7';
const EMAILJS_PUBLIC_KEY = 'GZcQyE8SKM0QaFOea';

export const sendFeedbackEmail = async (feedbackData) => {
  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
    throw new Error(
      'EmailJS не настроен: проверь Service ID, Template ID и Public Key'
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

  try {
    return await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      {
        publicKey: EMAILJS_PUBLIC_KEY,
      }
    );
  } catch (error) {
    console.error('EMAILJS ERROR:', error);

    throw new Error(
      error?.text ||
      error?.message ||
      'EmailJS не смог отправить письмо'
    );
  }
};