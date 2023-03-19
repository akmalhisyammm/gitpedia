import { IonButton } from '@ionic/react';

type CustomButtonProps = {
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
  onClick?: () => void;
  [key: string]: unknown;
};

const CustomButton = ({ children, color, href, onClick, ...rest }: CustomButtonProps) => {
  return (
    <IonButton
      color={color}
      expand="block"
      shape="round"
      routerLink={href}
      onClick={onClick}
      {...rest}>
      {children}
    </IonButton>
  );
};

export default CustomButton;
