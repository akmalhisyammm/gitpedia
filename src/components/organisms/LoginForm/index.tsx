import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonList,
  useIonLoading,
  useIonToast,
} from '@ionic/react';
import {
  mailOutline,
  lockClosedOutline,
  eyeOff,
  eye,
  alertCircle,
  checkmarkCircle,
} from 'ionicons/icons';

import { AuthContext } from 'contexts/auth';
import { CustomButton, CustomLink } from 'components/atoms';
import { InputGroup } from 'components/molecules';

import styles from './LoginForm.module.scss';

type LoginFormProps = {
  onForgotPassword: () => void;
};

const LoginForm = ({ onForgotPassword }: LoginFormProps) => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const [presentToast] = useIonToast();
  const [presentLoading, dismissLoading] = useIonLoading();

  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const emailRef = useRef<HTMLIonInputElement>(null);
  const passwordRef = useRef<HTMLIonInputElement>(null);

  const handleLogin = async () => {
    const email = emailRef.current?.value as string;
    const password = passwordRef.current?.value as string;

    if (!email || !password) {
      return presentToast({
        mode: 'ios',
        message: 'Email dan kata sandi harus diisi!',
        color: 'danger',
        duration: 2000,
        icon: alertCircle,
      });
    }

    try {
      presentLoading({ mode: 'ios', spinner: 'crescent' });

      await authCtx.login({ email, password });

      presentToast({
        mode: 'ios',
        message: 'Berhasil masuk!',
        color: 'success',
        cssClass: 'main-toast',
        duration: 2000,
        icon: checkmarkCircle,
      });

      history.replace('/main');
    } catch (error) {
      if (error instanceof Error) {
        presentToast({
          mode: 'ios',
          message: error.message,
          color: 'danger',
          duration: 2000,
          icon: alertCircle,
        });
      }
    } finally {
      dismissLoading();
    }
  };

  return (
    <IonGrid className={styles.wrapper}>
      <IonRow>
        <IonCol>
          <IonText>
            <h1 className={styles.title}>Masuk</h1>
          </IonText>
        </IonCol>
      </IonRow>

      <IonRow>
        <IonCol size="12">
          <IonList className={styles.list}>
            <InputGroup
              ref={emailRef}
              value={emailRef.current?.value as string}
              type="email"
              inputMode="email"
              placeholder="Email"
              iconStart={mailOutline}
            />
            <InputGroup
              ref={passwordRef}
              value={passwordRef.current?.value as string}
              type={isShowPassword ? 'text' : 'password'}
              placeholder="Kata Sandi"
              iconStart={lockClosedOutline}
              iconEnd={isShowPassword ? eyeOff : eye}
              onToggleType={() => setIsShowPassword(!isShowPassword)}
            />
          </IonList>
        </IonCol>
        <IonCol size="12">
          <CustomButton color="primary" onClick={handleLogin}>
            Masuk
          </CustomButton>
        </IonCol>
      </IonRow>

      <IonRow>
        <IonCol size="12">
          <CustomLink color="primary" onClick={onForgotPassword} isUnderline>
            Lupa Kata Sandi?
          </CustomLink>
        </IonCol>
        <IonCol size="12">
          <IonText className={styles.footer}>
            Belum punya akun?{' '}
            <CustomLink href="/auth/register" color="primary" isUnderline>
              Daftar
            </CustomLink>
          </IonText>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default LoginForm;
