import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Injectable, Logger } from '@nestjs/common';
import { ServerToClientEvents, ClientToServerEvents, Ishare } from './video.d';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@Injectable()
export class VideoGateway {
  @WebSocketServer() server: Server = new Server<
    ServerToClientEvents,
    ClientToServerEvents
  >();
  private logger = new Logger('VideoGateway');

  @SubscribeMessage('share')
  async handleEvent(
    @MessageBody()
    payload: Ishare,
  ): Promise<Ishare> {
    this.logger.log(payload);
    this.server.emit('share', payload); // broadcast messages
    return payload;
  }
}
