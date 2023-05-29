import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import exp from 'constants';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach( async () => {
    /**
     * Creates an User array, whenever we call create method, we're going to actually take the supplied email and password and store it inside of this array
     * And then whenever we call find method we're going to search through that array and try to find a list of users with a matching email address
     */
    const users: User[] = [];
    fakeUsersService = {
      /**
       * this will modifier/override the find method of UsersService class, the new find method will receive a parameter and return an array then we will store that array to user variable and use it later
       * this will help more easier and simpler in the test case of signin - returns an user if correct password is provided
       */
      find: (email: string) => {
        const filteredUsers = users.filter(user => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      /**
       * this will modifier/override the create method of UsersService class, the new create method will receive these 2 email and password parameters then we will create an object based on those 2 parameters and push it to user parameter return that object
       */
      create: (email: string, password: string) => {
        const user = {id: Math.floor(Math.random() * 99999), email, password } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  })

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('signup - creates a new user with a salted and hashed password', async () => {
    const user = await service.signup('asdf@asdf.com', 'asdf');
    //  once user is created then user.password will be an encrypted password

    //  this will check the created password must be different the inputed password
    expect(user.password).not.toEqual('asdf');

    const [salt, hash] = user.password.split('.');
    //  this will check the created password must be contained a salt string
    expect(salt).toBeDefined();
    //  this will check the created password must be contained a hash string
    expect(hash).toBeDefined();
  });

  it('signup - throw an error if user signs up with email that is in use', async () => {
    /**
     * while this line called then find method will be called, then email `asdf@asdf.com` will be stored in user array
     */
    await service.signup('asdf@asdf.com', 'asdf');
  
    /**
     * this will check if signup method return BadRequestException
     * during signup method called, usersService.find methods will be called again, it will check email `asdf@asdf.com`, and email `asdf@asdf.com` is already in user array and returns an object {id: whatever, email: 'asdf@asdf.com', password: 'asdf'} so the next line of signup method in AuthService will throw an error and that is a purpose of this test case
    */
    await expect(service.signup('asdf@asdf.com', 'asdf')).rejects.toThrow(
      BadRequestException,
    );
  
  });

  it('signin - throws if signin is called with an unused email', async () => {
    /**
     * this will check if signin function return NotFoundException
     * during signin function called, usersService.find methods will be called but find function has been modifierd/overrided in this test case and return an empty object so the next line of signin function in AuthService will throw an error and that is a purpose of this test case
    */
    await expect(
      service.signin('asdf@asdf.com', 'passdflkj'),
    ).rejects.toThrow(NotFoundException);
  });
 
  it('signin - throws if an invalid password is provided', async () => {
    await service.signup('laskdjf@alskdfj.com', 'password');
    await expect(
      service.signin('laskdjf@alskdfj.com', 'laksdlfkj'),
    ).rejects.toThrow(BadRequestException);
  });
  
  it('signin - returns an user if correct password is provided', async () => {
    
    await service.signup('myemail@gmail.com', 'mypassword');

    const user = service.signin('myemail@gmail.com', 'mypassword');
    expect(user).toBeDefined();
  });

})
