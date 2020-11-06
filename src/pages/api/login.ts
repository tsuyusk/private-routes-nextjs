import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const KEY = 'jidsajioi';

export default (request: NextApiRequest, response: NextApiResponse) => {
  if (!request.body) {
    response.statusCode = 400;
    return response.json({ message: 'Error ' });
  }

  const { username, password } = request.body;

  return response.json({
    token: jwt.sign(
      {
        username,
        admin: username === 'admin' && password === 'admin',
      },
      KEY,
    ),
  });
};
