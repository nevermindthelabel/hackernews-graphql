function links(parent, args, context, info) {
  return context.prisma.user.findUnique({ where: { id: parent.id } }).links();
}

module.exports = {
  links
};
