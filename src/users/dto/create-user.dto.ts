import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto { 

    @ApiProperty ({required: true, example: 'usuario@empresa.com'})

    email : string;

    @ApiProperty ({required: true, example: 'Jane Doe'})
    name : string

    Username? : string

    @ApiProperty ({required: true, example : 'password123'})
    password : string

    @ApiProperty ({required: true, example: 'Tenant'})
    tenantName : string;

}
