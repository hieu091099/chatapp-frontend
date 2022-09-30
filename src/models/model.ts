

export interface User {
  id: number;
  email: string;
  avatarPath: string;
  displayName: string;
  isAdmin: any;
  status: boolean;
}

export interface MessageM {
  id: number;
  senderId: number;
  receiveId: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
