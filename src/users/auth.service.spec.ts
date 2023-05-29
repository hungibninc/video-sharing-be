import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import exp from 'constants';
import { BadRequestException, NotFoundException } from '@nestjs/common';

/**
   * To make a test for a module means that we will make a test for that module's methods. 
   * In this file we will test these 2 methods: signup and signin of AuthService class
   * Because AuthService instance is asking a dependency UsersService and these signup and signin methods are refering to these find and create methods from UsersService so we have to define them in this test file for using but test is not inside DI Container so it can not access to DI Container's dependencies - UsersService in this case, therefore we need to create a fakeUsersService and provide it to this test file
   * First we need to create AuthService instance and provide itself dependencies to implement the particular test cases
   */
//  describe just apply a further description to the test inside, it just helps us better kind of organize all of our different tests.
describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach( async () => {
    // This fakeUsersService object will define these find and create methods with their parameter that going to use in this test cases
    //  add type annotation Partial<UsersService> for make sure that all these fake methods we are putting together have the correct type signature.
    fakeUsersService = {
      /**
       * this will modifier/override the find function of UsersService class, the new find method will not receive parameter and return an empty array
       */
      find: () => Promise.resolve([]),
      /**
       * this will modifier/override the create function of UsersService class, the new create method will receive these 2 email and password parameters and return an object { id: 1, email, password }
       */
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
    };

    const module = await Test.createTestingModule({
      /**
       * this is a list of classes we want registered inside DI container.
       * This object is saying whenever AuthService asks for a copy of UsersService, then give them the value fakeUsersService
       * The first line `AuthService` is going to behave very similarly to how other classes we've taken a look out before are going to behave. this tells DI Container that at some point in time we are going to want to create an AuthService instance then DI Container is going to take a look at that class and understand all that class's dependencies
       * line `provide: Users Service,`, all classes are declared in the keyword provide is telling that they are dependencies of AuthService instance
       * line `useValue: fakeUsersService,` is declared the method dependencies will be use in this test case, it means that whenever UsersService's methods are called during Test if they are defined in fakeUsersService then Test library will use them for test
       */
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
     * this will modifier/override the find function of UsersService class, the new find method will not receive parameter and return an object {id: 1, email: 'a', password: 'b'}
     */
    fakeUsersService.find = () => Promise.resolve([{id: 1, email: 'a', password: 'b'} as User]);
  
    /**
     * this will check if signup function return BadRequestException
     * during signup function called, usersService.find methods will be called but find function has been modifierd/overrided in this test case and return an object {id: 1, email: 'a', password: 'b'} so the next line of signup function in AuthService will throw an error and that is a purpose of this test case
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
      service.signin('asdflkj@asdlfkj.com', 'passdflkj'),
    ).rejects.toThrow(NotFoundException);
  });
  
  it('signin - throws if signin is called with an invalid password', async () => {
    /**
     * this will modifier/override the find function of UsersService class, the new find method will not receive parameter and return an object { email: 'asdf@asdf.com', password: 'laskdjf' }
     */
    fakeUsersService.find = () =>
      Promise.resolve([
        { email: 'asdf@asdf.com', password: 'laskdjf' } as User,
      ]);
  
    /**
     * this will check if signup function return BadRequestException
     * during signup function called, usersService.find methods will be called but find function has been modifierd/overrided in this test case and return an object { email: 'asdf@asdf.com', password: 'laskdjf' } so the next line of signin function in AuthService will throw an error and that is a purpose of this test case
    */
    await expect(
      service.signin('laskdjf@alskdfj.com', 'passowrd'),
    ).rejects.toThrow(BadRequestException);
  });

  it('signin - returns an user if correct password is provided', async () => {
    /*
    //  we need signup an user with  with email and password below
    const user = await service.signup('myemail@gmail.com', 'mypassword');
    console.log(user);
    //  then it will return an user object
    {
      id: 1,
      email: 'myemail@gmail.com',
      password: 'ce838c9e70c1ee37.a78a058dbd20d408ca2390a0ad1bdc4453cb820a5217455eda8593f94afc431e'
    }
    */

    /**
     * this will modifier/override the find function of UsersService class, the new find method will not receive parameter and return an object 
      {
        id: 1,
        email: 'myemail@gmail.com',
        password: 'ce838c9e70c1ee37.a78a058dbd20d408ca2390a0ad1bdc4453cb820a5217455eda8593f94afc431e'
      }
     */
    fakeUsersService.find = () => 
      Promise.resolve([{
        id: 1,
        email: 'myemail@gmail.com',
        password: 'ce838c9e70c1ee37.a78a058dbd20d408ca2390a0ad1bdc4453cb820a5217455eda8593f94afc431e'
      } as User]);

    /**
     * this will check if signin function return an user object
     * during signin function called, usersService.find methods will be called but find function has been modifierd/overrided in this test case and return an object {
        id: 1,
        email: 'myemail@gmail.com',
        password: 'ce838c9e70c1ee37.a78a058dbd20d408ca2390a0ad1bdc4453cb820a5217455eda8593f94afc431e'
      } so the next line of signin function in AuthService will check password via this line
      if (storedHash !== hash.toString('hex')), if passed, means the password is correct then return an user and that is a purpose of this test case
    */
    const user = service.signin('myemail@gmail.com', 'mypassword');
    expect(user).toBeDefined();
  });

})
