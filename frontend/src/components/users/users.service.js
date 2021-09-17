import { apiUrl } from 'config/server';

export const postUser = async (data) => {
  try {
    const response = await fetch(`${apiUrl}/users/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const json = await response.json();

    return { success: json };
  } catch (err) {
    return { error: err };
  }
};

export const getUsers = async () => {
  try {
    const response = await fetch(`${apiUrl}/users/getrecent`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = await response.json();

    return { success: json };
  } catch (err) {
    return { error: err };
  }
};
