import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { promisify } from 'util';
import { randomBytes, scrypt as _scrypt } from 'crypto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signUp({ name, email, password }) {
    // Check If the email Already Exists

    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ForbiddenException();
    }

    // Generate a Salt

    const salt = randomBytes(8).toString('hex');

    // Hash the salt and Password Together

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // Join the Hashed result and the salt together

    const hashedPassword = salt + '/' + hash.toString('hex');

    // Create a New User and Save it

    const user = await this.usersService.create({
      name,
      email,
      password: hashedPassword,
    });

    // Return the User

    return user;
  }

  async signIn(email: string, password: string) {}
}
