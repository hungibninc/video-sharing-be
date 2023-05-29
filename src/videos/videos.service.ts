import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from './video.entity';
import { CreateVideoDto } from './dtos/create-video.dto';
import { User } from '../users/user.entity';

@Injectable()
export class VideosService {
  constructor(@InjectRepository(Video) private repo: Repository<Video>) {}

  getEstimate(user: User) {
    const userId = user.id;
    return this.repo.createQueryBuilder()
      .select('*')
      // .where('1=1')
      .where('userId=:userId', {userId})
      .getRawMany();
  }

  create(videoDto: CreateVideoDto, user: User) {
    const video = this.repo.create(videoDto);
    video.user = user;

    return this.repo.save(video);
  }

}
