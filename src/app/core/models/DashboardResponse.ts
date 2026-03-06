export interface UserAccountProjection{
  accountType: 'USER' | string;
  accountNumber: number;
  cachedBalance: number;
}

export interface UserProjection{
  userAccount: UserAccountProjection;
  username: string;
  age: number;
  email: string;
  userId: string;
  isActive: boolean;
  address: string;
}

//fazer essa parte
export interface CardProjection{
  pan: string;
  cvv: string;
  expiry: string;
}
export interface DashboardResponse{
  userProjection: UserProjection;
}
