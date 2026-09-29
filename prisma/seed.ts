
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Crear Tenant
  const tenant = await prisma.tenant.create({
    data: {
      name: 'Default Tenant',
    },
  });

  console.log('Tenant creado:', tenant);

  // Si necesitas crear Users con el tenantId:
  const user = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      name: 'Admin',
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