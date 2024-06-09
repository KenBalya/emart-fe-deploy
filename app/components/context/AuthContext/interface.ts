export interface LoginRequest {
    username: string;
    password: string;
  }
  
  export interface LoginResponse {
    token: string;
    userProfile: {
      id: number;
      username: string;
      email: string;
      role: string;
    };
  }
  
  export interface User {
    id: number;
    username: string;
    email: string;
    role: string;
  }
  
  export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
  }

  export interface CreateBalanceRequest{
    userId: number;
    amount: number;

  }