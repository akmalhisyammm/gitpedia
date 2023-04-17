export interface IUserLeaderboard {
  id: string;
  rank: number;
  name: string;
  occupation: string;
  gender: 'male' | 'female';
  avatar: string;
  frame: string;
  following: string[];
  followers: string[];
  totalStars: number;
  totalExp: number;
  socials: {
    name: 'Website' | 'GitHub' | 'LinkedIn' | 'Instagram' | 'Twitter';
    url: string;
  }[];
  lastUpdated: number;
}
