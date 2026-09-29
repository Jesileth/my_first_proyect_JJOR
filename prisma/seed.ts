
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Crear Tenant
  const tenant = await prisma.tenant.create({
    data: {
      name: 'Tenant prueba',
    },
  });

  console.log('Tenant creado:', tenant);

  // Si necesitas crear Users con el tenantId:
  const user = await prisma.user.upsert({
  where: { email: 'prueba@example.com' },   // debe coincidir con tu email
  update: {},                              // si existe, no cambia nada
  create: {
    email: 'prueba@example.com',
    name: 'PruebaUser',
    password: 'hashed_password_here',
    role: 'ADMIN',
    tenantId: tenant.id,
  },
});

  console.log('User creado:', user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });