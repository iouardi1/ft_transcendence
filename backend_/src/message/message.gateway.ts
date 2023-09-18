import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';

import { MessageService } from './message.service';
import { Socket, Server } from 'socket.io';
import { messageDTO } from '../dto/messageDTO';
import { userDTO } from '../dto/userDTO';
import { dmDTO } from '../dto/dmDTO';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessageGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private messageService: MessageService,) {}

  @WebSocketServer() server: Server;

  private mapy = new Map<string, Socket>();

  @SubscribeMessage('addUser')
  async handleAddUser(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: userDTO,
  ) {
    this.messageService.createUser(client, payload);
  }

  @SubscribeMessage('addDm')
  async handleAddDm(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: dmDTO,
  ) {
    this.messageService.createDm(client, payload, this.mapy);
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: messageDTO,
    server: Server,
  ) {
    this.messageService.createMessage(client, payload, server);
  }

  afterInit(server: Server) {
    //console.log(server);
    //Do stuffs
  }

  // handleDisconnect(client: Socket) {
  //   console.log(`Disconnected: ${client.id}`);
  //   // this.mapy.delete(payload.username);
  //   //Do stuffs
  // }
  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
    for (let entry of this.mapy.entries()) {
      if (entry[1] == client) this.mapy.delete(entry[0]);
    }
    //Do stuffs
  }

  async handleConnection(client: Socket) {
    console.log(`Connected ${client.id}`);
    /*For now, "token" is only a placeholder for the actual token to be intercepted, for now we will use it directly as a username, later we will do a lookup on it and figure out its corresponding user and then use the latter */
    const {token} = client.handshake.auth; 
    console.log(token);

    this.mapy.set(token, client);
    await this.messageService.joinRooms(client, token);
  }
}
