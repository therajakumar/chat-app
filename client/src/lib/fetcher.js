import axios from 'axios';

export const fetcher = async (payload) => {
  try {
    const {
      url,
      method = 'GET',
      data,
      params,
    } = payload;

    const response = await axios({
      method,
      url,
      data,
      params
    });

    return {
      data: response.data,
      error: null,
      headers: response.headers
    };
  } catch (error) {
    return {
      data: null,
      error: error?.response?.data || {
        message: 'Something went wrong'
      }
    };
  }
};
