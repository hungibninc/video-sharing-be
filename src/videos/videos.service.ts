import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from './video.entity';
import { CreateVideoDto } from './dtos/create-video.dto';
import { User } from '../users/user.entity';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { VideoGateway } from './video.gateway';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video) private repo: Repository<Video>,
    private readonly httpService: HttpService,
    private readonly videoGateway: VideoGateway,
  ) {}

  getVideo() {
    return this.repo
      .createQueryBuilder('v')
      .select('v.id, v.title, v.desc, v.url, user.email')
      .leftJoin('v.user', 'user')
      .where('1=1')
      .orderBy('v.id', 'DESC')
      .getRawMany();
  }

  async create(videoDto: CreateVideoDto, user: User) {
    const regExp =
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

    const matchs = videoDto.url.match(regExp);
    // console.log(matchs);
    if (matchs) {
      const youtubeId = matchs[1];
      const apiUrl =
        process.env.API_GOOGLE_URL +
        '&id=' +
        youtubeId +
        '&key=' +
        process.env.API_KEY;

      const { data } = await firstValueFrom(
        this.httpService.get(apiUrl).pipe(
          catchError((error: AxiosError) => {
            throw new BadRequestException('Youtube must exist');
          }),
        ),
      );

      //  video exists
      if (data.items[0]) {
        const item = data.items[0];
        const title = item.snippet.title;
        const url = process.env.API_YOUTUBE_URL + youtubeId;

        const notification = {
          name: user.name,
          email: user.email,
          title,
        };
        // console.log(notification);
        //  send share url notification
        this.videoGateway.server.emit('share', notification);

        const video = this.repo.create(videoDto);
        video.title = title;
        video.url = url;
        video.desc = item.snippet.description;
        video.user = user;
        return this.repo.save(video);
      } else throw new BadRequestException('Youtube Id invalid');
    } else throw new BadRequestException('Url should be Youtube');
  }
}
