import axios from 'axios';

export const getProkeralaToken = async () => {
  try {
    const form = new URLSearchParams();
    form.append('grant_type', 'client_credentials');
    form.append('client_id', process.env.PROKERALA_CLIENT_ID);
    form.append('client_secret', process.env.PROKERALA_CLIENT_SECRET);

    const res = await axios.post(
      'https://api.prokerala.com/token',
      form.toString(),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }
    );

    return res.data.access_token;
  } catch (err) {
    console.error('🔴 Token Error:', err.response?.data || err.message);
    throw new Error('Unable to get Prokerala token');
  }
};
