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

module.exports = {
  signup,
  login,
  post
};
