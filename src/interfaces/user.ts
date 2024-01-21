import type avatarOptions from "./avatarOptions";

export default interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
  avatar: avatarOptions;
  provider?: string;
  createdAt: Date;
  updatedAt: Date;
};
