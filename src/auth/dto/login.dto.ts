import { ApiProperty } from "@nestjs/swagger";

export class Logindto {
@ApiProperty ({required: true})
email: string

@ApiProperty ({required: true})
password: string;
}