import { CustomImage } from 'components/atoms';

import styles from './FramedAvatar.module.scss';

type FramedAvatarProps = {
  avatar: string;
  frame?: string;
  width: number;
};

const FramedAvatar = ({ avatar, frame, width }: FramedAvatarProps) => {
  return (
    <div className={styles.wrapper} style={{ width }}>
      <CustomImage
        src={
          avatar ||
          'https://firebasestorage.googleapis.com/v0/b/gitpedia-dev.appspot.com/o/avatars%2Fdefault.png?alt=media&token=3e15201f-04b2-49ee-bea1-5f1289a56b5e'
        }
        alt="Avatar"
        className={styles.avatar}
        style={{ width: frame ? width - 20 : width - 10 }}
      />
      {frame && <CustomImage src={frame} alt="Frame" className={styles.frame} />}
    </div>
  );
};

export default FramedAvatar;
