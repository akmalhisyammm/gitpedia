import { IonImg } from '@ionic/react';

type CustomImageProps = {
  src: string;
  alt: string;
  [key: string]: unknown;
};

const CustomImage = ({ src, alt, ...rest }: CustomImageProps) => {
  return <IonImg src={src} alt={alt} {...rest} />;
};

export default CustomImage;
