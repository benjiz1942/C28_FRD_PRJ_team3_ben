import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from './register.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hashPassword } from 'src/auth/hash';

@Injectable()
export class SignupService {
    constructor(private readonly prisma: PrismaService) { }

    async createUser(registerDto: RegisterDto) {

        const isNickNameExist = await this.prisma.user.findFirst({
            where: { nickname: registerDto.nickname },
            select: { id: true }
        })
        if (isNickNameExist) throw new BadRequestException('Nickname is already taken, please try a new one')


        const isEmailExist = await this.prisma.user.findFirst({
            where: { email: registerDto.email },
            select: { id: true }
        })
        if (isEmailExist) throw new BadRequestException('Email is already registered, please login.')


        try {
            if (!isEmailExist && !isNickNameExist) {
                await this.prisma.user.create({
                    data: {
                        email: registerDto.email,
                        nickname: registerDto.nickname,
                        englishLevel: registerDto.englishLevel,
                        password: `${await hashPassword(registerDto.password)}`
                    }
                })
                return { status: 'successful', message: 'new user created' }
            }
        } catch (err) {
            throw new BadRequestException('Unknown error occurred')
        }
    }
}
