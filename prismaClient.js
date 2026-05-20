const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

console.log("------------checking to see if there is an error-----------")

module.exports = prisma;
