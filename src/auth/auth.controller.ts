import { Body, Controller, Post} from '@nestjs/common';
import { Logindto } from './dto/login.dto';

@Controller('auth')
export class AuthController {

  @Post('login')
  login(
    @Body() data: Logindto
  )
  {
    //login logic -- me tiraba error sin esto jjaja
  }

}
