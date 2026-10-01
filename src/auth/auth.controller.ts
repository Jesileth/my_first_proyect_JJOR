import { Body, Controller, HttpException, HttpStatus, Post} from '@nestjs/common';
import { Logindto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() data: Logindto
  )
    {
    //login logic -- me tiraba error sin esto jjaja
        const usertoken = await this.authService.ValidateUser(data);
        
        if (!usertoken) throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED)
            return usertoken;


    }

}
