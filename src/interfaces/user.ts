import type avatarOptions from "./avatarOptions";

export default interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
  avatar: avatarOptions;
  provider?: string;
  created_at: Date;
  updated_at: Date;
};
