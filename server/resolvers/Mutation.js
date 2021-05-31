const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../util/util.js');

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.user.create({
    data: { ...args, password }
  });
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user
  };
}

async function login(parent, args, context, info) {
  const user = await context.prisma.user.findUnique({
    where: { email: args.email }
  });

  const valid = await bcrypt.compare(args.password, user.password);

  if (!user || !valid) {
    throw new Error('Invalid Username or Password');
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    user,
    token
  };
}

async function post(parent, args, context, info) {
  const { userId } = context;

  return await context.prisma.link.create({
    data: {
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: userId } }
    }
  });
}

module.exports = {
  signup,
  login,
  post
};
