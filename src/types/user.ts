export interface IUserItem {
  id: string;
  type: 'avatar' | 'frame';
  name: string;
  thumbnail: string;
}

export interface IUserActivity {
  following: string[];
  followers: string[];
}

export interface IUserProgress {
  totalCoins: number;
  totalStars: number;
  learns: {
    chapterId: number;
    lessonId: number;
    stars: number;
    isPassed: boolean;
  }[];
}

export interface IUserProfile {
  name: string;
  occupation: string;
  gender: 'male' | 'female';
  avatar: string;
  frame: string;
  socials: {
    name: 'Website' | 'GitHub' | 'LinkedIn' | 'Instagram' | 'Twitter';
    url: string;
  }[];
}

export interface IUser extends IUserProfile {
  id: string;
  email: string;
  items: IUserItem[];
  activity: IUserActivity;
  progress: IUserProgress;
}
