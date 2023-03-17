import { IonRouterLink } from '@ionic/react';

import styles from './CustomLink.module.scss';

type CustomLinkProps = {
  children: React.ReactNode;
  color:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'light'
    | 'medium'
    | 'dark';
  href?: string;
  onClick?: () => void;
  [key: string]: unknown;
};

const CustomLink = ({ children, color, href, onClick, ...rest }: CustomLinkProps) => {
  return (
    <IonRouterLink
      color={color}
      routerLink={href}
      className={styles.link}
      onClick={onClick}
      {...rest}>
      {children}
    </IonRouterLink>
  );
};

export default CustomLink;
