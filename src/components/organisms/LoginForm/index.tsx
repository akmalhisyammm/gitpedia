import { IonGrid, IonRow, IonCol, IonText, IonList } from '@ionic/react';
import { mailOutline, lockClosedOutline, eyeOff, eye } from 'ionicons/icons';
import { useState, useRef } from 'react';

import { InputGroup } from 'components/molecules';

import styles from './LoginForm.module.scss';
import { CustomButton, CustomLink } from 'components/atoms';

type LoginFormProps = {
  onForgotPassword: () => void;
};

const LoginForm = ({ onForgotPassword }: LoginFormProps) => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const emailRef = useRef<HTMLIonInputElement>(null);
  const passwordRef = useRef<HTMLIonInputElement>(null);

  const handleLogin = async () => {
    console.log('Login');
  };

  const enterKeyDown = (e: React.KeyboardEvent<HTMLIonInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleLogin();
    }
  };

  return (
    <IonGrid className={styles.wrapper}>
      <IonRow>
        <IonCol>
          <h1 className={styles.header}>
            <IonText>Masuk</IonText>
          </h1>

          <IonRow>
            <IonCol>
              <IonList className={styles.list}>
                <InputGroup
                  ref={emailRef}
                  type="email"
                  inputMode="email"
                  placeholder="Email"
                  iconStart={mailOutline}
                  onKeyDown={(e) => enterKeyDown(e)}
                />
                <InputGroup
                  ref={passwordRef}
                  type={isShowPassword ? 'text' : 'password'}
                  placeholder="Kata Sandi"
                  iconStart={lockClosedOutline}
                  iconEnd={isShowPassword ? eyeOff : eye}
                  onKeyDown={(e) => enterKeyDown(e)}
                  onToggleType={() => setIsShowPassword(!isShowPassword)}
                />
              </IonList>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <CustomButton color="primary" onClick={handleLogin}>
                Masuk
              </CustomButton>
            </IonCol>
          </IonRow>
        </IonCol>
      </IonRow>

      <IonRow>
        <IonCol>
          <CustomLink color="primary" onClick={onForgotPassword}>
            Lupa Kata Sandi?
          </CustomLink>
        </IonCol>
      </IonRow>

      <IonRow>
        <IonCol>
          <IonText className={styles.footer}>
            Belum punya akun?{' '}
            <CustomLink color="primary" href="/auth/register">
              Daftar
            </CustomLink>
          </IonText>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default LoginForm;
