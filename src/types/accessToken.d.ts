export interface AccessTokenTypes {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  profilePicture?: string | null;
  exp: number;
  iat: number;
}
