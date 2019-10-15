import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/authconfig';

/** Check the authentication data of the user making the request.
 *  Verify that you are really logged in. */
export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
