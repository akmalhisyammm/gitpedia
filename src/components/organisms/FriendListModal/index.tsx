import { useContext, useEffect, useState } from 'react';
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonButtons,
  IonButton,
  IonIcon,
  IonText,
} from '@ionic/react';
import { closeOutline } from 'ionicons/icons';

import { UserContext } from 'contexts/user';
import { CustomLink } from 'components/atoms';
import { FriendItem } from 'components/molecules';

import type { IUser } from 'types/user';

import styles from './FriendListModal.module.scss';

type FriendListModalProps = {
  type: 'following' | 'followers' | null;
  userId: string;
  isOpen: boolean;
  onDismiss: () => void;
};

const FriendListModal = ({ type, userId, isOpen, onDismiss }: FriendListModalProps) => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [following, setFollowing] = useState<IUser[]>([]);
  const [followers, setFollowers] = useState<IUser[]>([]);

  const userCtx = useContext(UserContext);

  useEffect(() => {
    const user = userCtx.users.find((user) => user.id === userId);
    const followingUsers = user?.friend.following
      .map((id) => userCtx.users.find((user) => user.id === id))
      .filter((user) => user) as IUser[];
    const followerUsers = user?.friend.followers
      .map((id) => userCtx.users.find((user) => user.id === id))
      .filter((user) => user) as IUser[];

    setCurrentUser(user || null);
    setFollowing(followingUsers);
    setFollowers(followerUsers);
  }, [userCtx.user?.friend, userCtx.users, userId]);

  if (!currentUser || !following || !followers) return null;

  return (
    <IonModal isOpen={isOpen}>
      <IonHeader>
        <IonToolbar color="tertiary">
          <IonTitle>{type === 'following' ? 'Mengikuti' : 'Pengikut'}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onDismiss}>
              <IonIcon icon={closeOutline} slot="icon-only" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList className={styles.list}>
          {type === 'following' ? (
            following.length ? (
              following.map((friend) => (
                <CustomLink
                  key={friend.id}
                  href={friend.id === userCtx.user?.id ? '/main/profile' : `/user/${friend.id}`}
                  onClick={onDismiss}>
                  <FriendItem
                    name={friend.profile.name}
                    avatar={friend.profile.avatar}
                    frame={friend.profile.frame}
                  />
                </CustomLink>
              ))
            ) : (
              <IonText className="ion-text-center">
                <p>Belum mengikuti teman</p>
              </IonText>
            )
          ) : followers.length ? (
            followers.map((friend) => (
              <CustomLink
                key={friend.id}
                href={friend.id === userCtx.user?.id ? '/main/profile' : `/user/${friend.id}`}
                onClick={onDismiss}>
                <FriendItem
                  name={friend.profile.name}
                  avatar={friend.profile.avatar}
                  frame={friend.profile.frame}
                />
              </CustomLink>
            ))
          ) : (
            <IonText className="ion-text-center">
              <p>Belum memiliki pengikut</p>
            </IonText>
          )}
        </IonList>
      </IonContent>
    </IonModal>
  );
};

export default FriendListModal;
