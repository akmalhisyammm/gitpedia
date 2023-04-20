import { DEFAULT_AVATAR_URL } from 'constants/images';
import { CustomImage } from 'components/atoms';

import styles from './FramedAvatar.module.scss';

type FramedAvatarProps = {
  avatar?: string;
  frame?: string;
  width: number;
};

const FramedAvatar = ({ avatar, frame, width }: FramedAvatarProps) => {
  return (
    <div className={styles.wrapper} style={{ width }}>
      <CustomImage
        src={avatar || DEFAULT_AVATAR_URL}
        alt="Avatar"
        className={styles.avatar}
        style={{ width: width - 10 }}
      />
      {frame && <CustomImage src={frame} alt="Frame" className={styles.frame} />}
    </div>
  );
};

export default FramedAvatar;
