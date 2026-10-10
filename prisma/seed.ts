
import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
   // Datos del tenant
  const tenantData =  'J Doe'

  // Datos del usuario
  /*const userData = {
  email: 'admin@miempresa.com',
  name: 'Johana Ramírez',
  password: 'Admin12345',
  telephone: '50588888888',
  role: 'ADMIN',
};*/

 // Datos del usuario
  const email = 'Jane1@gmail.com';
  const name = 'J Doe';
  const password = '1234';
  const telephone = '87888888';

    // Tenant: busca por nombre, si no existe lo crea
   const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    console.log('El usuario ya existe:', existing.email);
    return;
  }

  console.log('Tenant creado:', tenantData);

 const hashedPassword = await bcrypt.hash(password, 10);

  // Users con el tenantId:
  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      telephone,
      role: Role.USER,
      tenant: {
        create: { name: tenantData },
      },
    },
    include: { tenant: true },
  });

  
/*  console.log('User creado:', user);*/
 console.log('Usuario creado:', {
    id: user.id,
    email: user.email,
    password: user.password,
    role: user.role,
    tenantId: user.tenantId,
    tenantName: user.tenant.name,
  });

}



main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });