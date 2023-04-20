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
  isCompleted: boolean;
}

export interface IUserItem {
  id: number;
  type: 'avatar' | 'frame';
  name: string;
  thumbnail: string;
}

export interface IUserFriend {
  following: string[];
  followers: string[];
}

export interface IOtherUserFriend extends IUserFriend {
  id: string;
}

export interface IUserProgress {
  totalCoins: number;
  totalStars: number;
  totalExp: number;
  learns: {
    chapterId: number;
    lessonId: number;
    stars: number;
    isPassed: boolean;
  }[];
  lastUpdated: number;
}

export interface IUser {
  id: string;
  email: string;
  profile: IUserProfile;
  items: IUserItem[];
  friend: IUserFriend;
  progress: IUserProgress;
}
