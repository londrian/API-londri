const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  laundry: prisma.laundry,
  user: prisma.user,
  layanan: prisma.layanan,
  order: prisma.order,
};
