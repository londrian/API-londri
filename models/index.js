const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  laundry: prisma.laundry,
  customer: prisma.customer,
  layanan: prisma.layanan,
  order: prisma.order,
};
