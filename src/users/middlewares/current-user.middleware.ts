import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../users.service';
import { User } from '../user.entity';

/**
 * this test Typescript that this request might have a current user property that is going to be an instance of a user
 * So this is going to update or add in additional property to an existing interface, so we're saying go and find the express library, find the interface called request inside there, and we're going to add in one more property to that interface.
 * this will fix the error in this line req.currentUser = user;
 */
declare global {
  namespace Express {
    interface Request {
      //  We're going to say that in Request object might have an optional a currentUser property and if it is defined, it's going to be set to a User entity instant's.
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.session || {};

    if (userId) {
      const user = await this.usersService.findOne(userId);
      req.currentUser = user;
    }

    next();
  }
}
