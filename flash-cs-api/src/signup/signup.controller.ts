import { Body, Controller, Post } from '@nestjs/common';
import { SignupService } from './signup.service';
import { RegisterDto } from './register.dto';

@Controller('signup')
export class SignupController {
    constructor(private readonly signupService: SignupService) { }
    @Post()
    createUser(@Body() registerDto: RegisterDto) {
        return this.signupService.createUser(registerDto)
    }
}
