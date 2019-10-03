const jwt = require('jsonwebtoken');
const APP_SECRET = 'secret-hidden-passWorD';

function getUserId(context) {
  const Authorization = context.request.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer', '');
    const { userID } = jwt.verify(token, APP_SECRET);
    return userID;
  }
  throw new Error('Not Authenticated');
}

module.exports = {
  APP_SECRET,
  getUserId
}
