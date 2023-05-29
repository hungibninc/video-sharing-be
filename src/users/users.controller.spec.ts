import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    /**
     * So now inside both these objects, we're going to put together a set of methods that will eventually be called by our controller as we are testing it
     */
    fakeUsersService = {
      /**
       * remember, it's totally up to you how you implement the function.
       * We are taking in an id and presumably from something like a findOne method, we would find a user with exactly that id.
       * But if you return a user that had a totally different ID, well then this function doesn't really make a lot of sense or the mock implementation doesn't make a lot of sense.
       */
      findOne: (id: number) => {
        return Promise.resolve({
          id, //  We are taking in an id and presumably from something like a findOne method, we would find a user with exactly that id
          //  id: 43463, // But if you return a user that had a totally different ID, well then this function doesn't really make a lot of sense or the mock implementation doesn't make a lot of sense.
          email: 'asdf@asdf.com',
          password: 'asdf',
        } as User);
      },
      find: (email: string) => {
        return Promise.resolve([{ id: 1, email, password: 'asdf' } as User]);
      },
      // remove: () => {},
      // update: () => {},
    };
    fakeAuthService = {
      // signup: () => {},
      signin: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as User);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUsers return a list of users with a given email', async () => {
    const users = await controller.findAllUsers('myemail@gmail.com');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('myemail@gmail.com');
  });

  it('findUser return signle user with the given id', async () => {
    const user = await controller.findUser('1');
    expect(user).toBeDefined();
  });

  it('findUser throw an error if an invalid id is provided', async () => {
    fakeUsersService.findOne = (id: number) => null;
    await expect(
      controller.findUser('1')
    ).rejects.toThrow(NotFoundException);
  });

  it('signin updates session object and returns user', async () => {
    const session = { userId: -10 };
    const user = await controller.signin({email:'myemail@gmail.com', password:'mypassword'}, session);
    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });
});
