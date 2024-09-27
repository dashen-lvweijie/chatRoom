
import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Logger } from '@nestjs/common';
  import { Socket, Server } from 'socket.io';
  
  @WebSocketGateway({
    namespace: 'chat',
    cors: {
      origin: '*',
    },
  })
  export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('ChatGateway');
    users = 0;
  
    @SubscribeMessage('msgToServer')
    handleMessage(client: Socket, payload: string): void {
      // 获取当前时间并格式化为“YYYY-MM-DD HH:mm:ss”
      const currentTime = new Date().toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false, // 使用24小时制
      }).replace(/\//g, '-').replace(/,/, ' '); // 替换分隔符以符合所需格式
  
      // 创建一个新的消息对象，包含时间和消息内容
      const messageWithTime = {
        time: currentTime, // 当前时间
        data: payload,
      };
      
      this.server.emit('msgToClient', messageWithTime); // 发送包含时间的消息对象
    }
  
    afterInit(server: Server) {
      this.logger.log('Init');
    }
  
    handleDisconnect(client: Socket) {
      this.logger.log(`Client disconnected: ${client.id}`);
      this.users--;
      // 通知连接的客户端当前用户数量
      this.server.emit('users', this.users);
    }
  
    handleConnection(client: Socket, ...args: any[]) {
      this.logger.log(`Client connected: ${client.id}`);
      this.users++;
      // 通知连接的客户端当前用户数量
      this.server.emit('users', this.users);
    }
  }
  