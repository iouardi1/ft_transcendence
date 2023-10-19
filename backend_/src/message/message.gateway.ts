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
import { dmDTO } from '../dto/dmDTO';
import { roomDTO } from '../dto/roomDTO';
import { roomInviteDTO } from '../dto/roomInviteDTO';
import { actionDTO } from '../dto/actionDTO';
import { friendRequestDTO } from 'src/dto/friendRequestDTO';
import { roomJoinDTO } from 'src/dto/roomJoinDTO';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessageGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private messageService: MessageService) {}

  @WebSocketServer() server: Server;

  private mapy = new Map<string, Socket>();
  @SubscribeMessage('createDm')
  async handleAddDm(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: dmDTO,
  ) {
    this.messageService.createDm(client, payload, this.mapy);
  }

  @SubscribeMessage('createRoom')
async handleAddRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: roomDTO,
  ) {
    this.messageService.createRoom(client, this.server, payload, this.mapy);
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @MessageBody() payload: messageDTO,
  ) {
    this.messageService.createMessage(payload, this.server);
  }

  @SubscribeMessage('roomInvite')
  async handleRoomInvite(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: roomInviteDTO,
  ) {
    console.log("ANA HONA");


    this.messageService.sendRoomInvite(client, payload, this.mapy);
  }

  @SubscribeMessage('roomInviteAccepted')
  async handleRoomInviteApproval(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: roomInviteDTO,
  ) {
    this.messageService.roomInviteApproval(client, this.server, payload, this.mapy);
  }

  @SubscribeMessage('roomInviteRejected')
  async handleRoomInviteRejection(
    @MessageBody() payload: roomInviteDTO,
  ) {
    this.messageService.roomInviteRejection(payload, this.mapy);
  }

  @SubscribeMessage('notifClicked')
  async handleNotifClicked(
    @MessageBody() payload: roomInviteDTO,
  ) {
    this.messageService.notifClicked(payload);
  }

  @SubscribeMessage('promote')
  async handlePromotion(
    @MessageBody() payload: actionDTO,
  ) {
    this.messageService.promoteUser(this.server, payload, this.mapy);
  }

  @SubscribeMessage('demote')
  async handleDemotion(
    @MessageBody() payload: actionDTO,
  ) {
    this.messageService.demoteUser(this.server, payload, this.mapy);
  }

  @SubscribeMessage('mute')
  async handleMute(
    @MessageBody() payload: actionDTO,
  ) {
    this.messageService.muteUser(this.server, payload, this.mapy);
  }

  @SubscribeMessage('unmute')
  async handleUnmute(
    @MessageBody() payload: actionDTO,
  ) {
    this.messageService.unmuteUser(this.server, payload, this.mapy);
  }

  @SubscribeMessage('kick')
  async handleKick(
    @MessageBody() payload: actionDTO,
  ) {
    this.messageService.kickUser(this.server, payload, this.mapy);
  }

  @SubscribeMessage('ban')
  async handleBan(
    @MessageBody() payload: actionDTO,
  ) {
    this.messageService.banUser(this.server, payload, this.mapy);
  }

  @SubscribeMessage('unban')
  async handleUnban(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: actionDTO,
  ) {
    this.messageService.unbanUser(client, this.server, payload, this.mapy);
  }

  @SubscribeMessage('transferOwnership')
  async handleOwnershipTransfer(
    @MessageBody() payload: actionDTO,
  ) {
    this.messageService.OwnershipTransfer(this.server, payload, this.mapy);
  }

  @SubscribeMessage('changePassword')
  async handleRoomPasswordChange(
    @MessageBody() info: [number, string],
  ) {
    this.messageService.changePassword(info);
  }

  @SubscribeMessage('blockUser')
  async handleUserBlock(
    @ConnectedSocket() client: Socket,
    @MessageBody() blockedUserId: string,
  ) {
    this.messageService.blockUser(client, blockedUserId, this.mapy);
  }

  @SubscribeMessage('unblockUser')
  async handleUserUnblock(
    @ConnectedSocket() client: Socket,
    @MessageBody() unblockedUserId: string,
  ) {
    this.messageService.unblockUser(client, unblockedUserId, this.mapy);
  }

  @SubscribeMessage('sendFriendRequest')
  async handleFriendRequest(
    @ConnectedSocket() client: Socket,
    @MessageBody() befriendedUserId: number,
  ) {
    this.messageService.sendFriendRequest(client, befriendedUserId, this.mapy);
  }

  @SubscribeMessage('acceptFriendRequest')
  async handleFriendRequestApproval(
    @MessageBody() payload: friendRequestDTO,
  ) {
    this.messageService.friendRequestApproval(payload, this.mapy);
  }

  @SubscribeMessage('rejectFriendRequest')
  async handleFriendRequestRejection(
    @MessageBody() payload: friendRequestDTO,
  ) {
    this.messageService.friendRequestRejection(payload, this.mapy);
  }

  @SubscribeMessage('joinRoom')
  async handleRoomJoin(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: roomJoinDTO,
  ) {
    this.messageService.roomJoin(this.server, client, payload);
  }

  @SubscribeMessage('leaveRoom')
  async handleRoomExit(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomId: number,
  ) {
    this.messageService.roomExit(client, this.server, roomId, this.mapy);
  }

  afterInit(server: Server) {
    //console.log(server);
    //Do stuffs
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
    for (let entry of this.mapy.entries()) {
      if (entry[1] == client) this.mapy.delete(entry[0]);
    }
  }

  async handleConnection(client: Socket) {
    console.log(`Connected ${client.id}`);
    /*For now, "token" is only a placeholder for the actual token to be intercepted, for now we will use it directly as a username, later we will do a lookup on it and figure out its corresponding user and then use the latter */
    let {token} = client.handshake.auth;
    this.mapy.set(token, client);
    await this.messageService.fetchState(client, token);
  }
}
