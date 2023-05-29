import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  desc: string;
  
  @Column()
  url: string;

  /**
   * () => User: this is saying Video entity is going to be associated with User entity
   * (user) => {user.Videos}: take an instance of the entity that Video entity is trying to relate to
   */
  @ManyToOne(() => User, (user) => {user.videos})
  user: User;
}
