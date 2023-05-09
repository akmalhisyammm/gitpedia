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
  isExternal?: boolean;
  onClick?: () => void;
  [key: string]: unknown;
};

const CustomLink = ({
  children,
  color,
  href,
  isUnderline,
  isExternal,
  onClick,
  ...rest
}: CustomLinkProps) => {
  return (
    <IonRouterLink
      color={color}
      routerLink={!isExternal ? href : undefined}
      href={isExternal ? href : undefined}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      onClick={onClick}
      className={styles.link}
      style={{ textDecoration: isUnderline ? 'underline' : 'none' }}
      {...rest}>
      {children}
    </IonRouterLink>
  );
};

export default CustomLink;
