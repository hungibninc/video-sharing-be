import {
  Controller,
  Post,
  Body,
  UseGuards,
  Patch,
  Param,
  Get,
  Query
} from '@nestjs/common';
import { CreateVideoDto } from './dtos/create-video.dto';
import { VideosService } from './videos.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { VideoDto } from './dtos/video.dto';
import { Serialize } from '../interceptors/serialize.interceptor';

@Controller('videos')
export class VideosController {
  constructor(private videosService: VideosService) {}

  @Get()
  getVideo() {
    return this.videosService.getVideo();
  }

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(VideoDto)
  createVideo(@Body() body: CreateVideoDto, @CurrentUser() user: User) {
    return this.videosService.create(body, user);
  }

}
