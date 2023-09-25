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
import { roomDTO } from '../dto/roomDTO';
import { roomInviteDTO } from '../dto/roomInviteDTO';
import { actionDTO } from '../dto/actionDTO';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessageGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private messageService: MessageService) {}

  @WebSocketServer() server: Server;

  private mapy = new Map<string, Socket>();

  @SubscribeMessage('addDm')
  async handleAddDm(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: dmDTO,
  ) {
    this.messageService.createDm(client, payload, this.mapy);
  }

  @SubscribeMessage('addRoom')
  async handleAddRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: roomDTO,
  ) {
    this.messageService.createRoom(client, payload, this.mapy);
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: messageDTO,
  ) {
    this.messageService.createMessage(client, payload);
  }

  @SubscribeMessage('roomInvite')
  async handleRoomInvite(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: roomInviteDTO,
  ) {
    this.messageService.sendRoomInvite(client, payload, this.mapy);
  }

  @SubscribeMessage('roomInviteAccepted')
  async handleRoomInviteApproval(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: roomInviteDTO,
  ) {
    this.messageService.roomInviteApproval(client, payload, this.mapy);
  }

  @SubscribeMessage('roomInviteRejected')
  async handleRoomInviteRejection(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: roomInviteDTO,
  ) {
    this.messageService.roomInviteRejection(client, payload, this.mapy);
  }

  @SubscribeMessage('notifClicked')
  async handleNotifClicked(@MessageBody() payload: roomInviteDTO) {
    this.messageService.notifClicked(payload);
  }

  //room privileges
  @SubscribeMessage('promote')
  async handlePromotion(@MessageBody() payload: actionDTO) {
    this.messageService.promoteUser(payload, this.mapy);
  }

  @SubscribeMessage('demote')
  async handleDemotion(@MessageBody() payload: actionDTO) {
    this.messageService.demoteUser(payload, this.mapy);
  }

  @SubscribeMessage('mute')
  async handleMute(@MessageBody() payload: actionDTO) {
    this.messageService.muteUser(payload, this.mapy);
  }

  @SubscribeMessage('kick')
  async handleKick(@MessageBody() payload: actionDTO) {
    this.messageService.kickUser(payload, this.mapy);
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

  private flag: boolean = false;

  async handleConnection(client: Socket) {
    console.log(`Connected ${client.id}`);
    /*For now, "token" is only a placeholder for the actual token to be intercepted, for now we will use it directly as a username, later we will do a lookup on it and figure out its corresponding user and then use the latter */
    let { token } = client.handshake.auth;
    console.log(token);
    /*Get rid of this mess later */
    if (typeof token === 'undefined' && !this.flag) {
      this.flag = true;
      this.mapy.set('mamma mia', client);
      token = 'mamma mia';
    } else if (typeof token === 'undefined' && this.flag) {
      // this.flag = true;
      this.mapy.set('mamma', client);
      token = 'mamma';
    } else this.mapy.set(token, client);
    const state = await this.messageService.fetchState(client, token);
    return state;
  }
}
