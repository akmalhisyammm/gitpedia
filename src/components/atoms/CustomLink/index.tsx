import { IonRouterLink } from '@ionic/react';

import styles from './CustomLink.module.scss';

type CustomLinkProps = {
  children: React.ReactNode;
  color?:
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
  isUnderline?: boolean;
  onClick?: () => void;
  [key: string]: unknown;
};

const CustomLink = ({ children, color, href, isUnderline, onClick, ...rest }: CustomLinkProps) => {
  return (
    <IonRouterLink
      color={color}
      routerLink={href}
      className={isUnderline ? styles.link : ''}
      onClick={onClick}
      {...rest}>
      {children}
    </IonRouterLink>
  );
};

export default CustomLink;
