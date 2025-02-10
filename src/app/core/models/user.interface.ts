export interface User {
  id?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  phone: string;
  dateOfBirth: string;
  profileImage?: string;
  role: 'collector' | 'user';
  points: number;
  isActive: boolean;
} 