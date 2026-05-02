const API = 'http://localhost:8000/api';

export const testAPI = async () => {
  const response = await fetch(`${API}/test/`);
  return response.json();
};