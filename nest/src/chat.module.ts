import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
//cli: nest g module chat
@Module({
  providers: [ChatGateway],
})
export class ChatModule {}
