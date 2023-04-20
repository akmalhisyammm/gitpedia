import { IonItem, IonText } from '@ionic/react';

import { FramedAvatar } from 'components/atoms';

import styles from './FriendItem.module.scss';

type FriendItemProps = {
  name: string;
  avatar: string;
  frame: string;
};

const FriendItem = ({ name, avatar, frame }: FriendItemProps) => {
  return (
    <IonItem button detail>
      <div className={styles.profile}>
        <FramedAvatar avatar={avatar} frame={frame} width={60} />
        <IonText>{name}</IonText>
      </div>
    </IonItem>
  );
};

export default FriendItem;
