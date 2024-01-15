export default interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
  avatar: string;
  provider?: string;
  created_at: Date;
  updated_at: Date;
};
