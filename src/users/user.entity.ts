import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm';
import { Video } from '../videos/video.entity';
// do not use Exclude that suggested from Nest
//  import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  // do not use Exclude that suggested from Nest
  //  whenever you take an instance of a user and turn them into a plain object and then into JSON, just exclude the password.
  //  this works with UseInterceptors, ClassSerializerInterceptor in controller file
  // @Exclude()
  password: string;

  @Column({default: true})
  admin: boolean;

  @OneToMany(() => Video, (video) => {video.user})
  videos: Video[];

  @AfterInsert()
  logInsert() {
    // console.log('Inserted User with id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    // console.log('Updated User with id', this.id);
  }

  @AfterRemove()
  logRemove() {
    // console.log('Removed User with id', this.id);
  }
}
