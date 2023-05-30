import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from './video.entity';
import { CreateVideoDto } from './dtos/create-video.dto';
import { User } from '../users/user.entity';

@Injectable()
export class VideosService {
  constructor(@InjectRepository(Video) private repo: Repository<Video>) {}

  getVideo() {
    return this.repo.createQueryBuilder()
      .select('*')
      .where('1=1')
      // .where('userId=:userId', {userId})
      .getRawMany();
  }

  create(videoDto: CreateVideoDto, user: User) {
    
    const regExp = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if(videoDto.url.match(regExp)){
      const video = this.repo.create(videoDto);
      video.user = user;
      return this.repo.save(video);
    } else {
      throw new BadRequestException('url should be Youtube');
    }
    
  }

}
