import { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonCol,
  IonGrid,
  IonList,
  IonRow,
  IonText,
  useIonLoading,
  useIonToast,
} from '@ionic/react';
import {
  alertCircle,
  checkmarkCircle,
  eye,
  eyeOff,
  lockClosedOutline,
  mailOutline,
} from 'ionicons/icons';

import { EXPIRED_ILLUSTRATION_URL, VERIFIED_ILLUSTRATION_URL } from 'constants/images';
import { AuthContext } from 'contexts/auth';
import { CustomImage, CustomButton } from 'components/atoms';
import { InputGroup } from 'components/molecules';
import { LoadingScreen } from 'components/templates';

import styles from './VerifyEmailForm.module.scss';

type VerifyEmailFormProps = {
  oobCode: string;
};

const VerifyEmailForm = ({ oobCode }: VerifyEmailFormProps) => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [presentToast] = useIonToast();
  const [presentLoading, dismissLoading] = useIonLoading();

  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const emailRef = useRef<HTMLIonInputElement>(null);
  const passwordRef = useRef<HTMLIonInputElement>(null);

  const handleRedirectToLogin = async () => {
    await authCtx.logout();

    history.push('/auth/login');
  };

  const handleSendVerificationEmail = async () => {
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

      await authCtx.requestEmailVerification({ email, password });
      await authCtx.logout();

      presentToast({
        mode: 'ios',
        message: 'Berhasil terkirim, silakan periksa kembali email kamu!',
        color: 'success',
        cssClass: 'custom-toast',
        icon: checkmarkCircle,
        buttons: [
          {
            text: 'OK',
            role: 'cancel',
          },
        ],
      });

      history.replace('/auth/login');
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

  useEffect(() => {
    const handleVerifyEmail = async () => {
      try {
        setIsLoading(true);

        await authCtx.verifyEmail({ oobCode });

        setIsVerified(true);
      } finally {
        setIsLoading(false);
      }
    };

    handleVerifyEmail();
  }, []);

  if (isLoading) return <LoadingScreen />;

  return (
    <IonGrid className={styles.wrapper}>
      {isVerified ? (
        <>
          <IonRow>
            <IonCol>
              <IonText color="primary">
                <h3 className={styles.title}>Email kamu berhasil di verifikasi!</h3>
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <CustomImage
                src={VERIFIED_ILLUSTRATION_URL}
                alt="Verified"
                className={styles.illustration}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonText>
                <p>Silakan masuk kembali ke aplikasi Gitpedia di ponsel kamu.</p>
              </IonText>
              <hr />
              <IonText color="medium">
                <small>Jika menggunakan browser, kamu dapat menekan tombol di bawah:</small>
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <CustomButton color="primary" onClick={handleRedirectToLogin}>
                Masuk
              </CustomButton>
            </IonCol>
          </IonRow>
        </>
      ) : (
        <>
          <IonRow>
            <IonCol>
              <IonText color="primary">
                <h3 className={styles.title}>
                  Kode verifikasi tidak valid atau sudah kedaluwarsa!
                </h3>
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <CustomImage
                src={EXPIRED_ILLUSTRATION_URL}
                alt="Expired"
                className={styles.illustration}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            {authCtx.user && authCtx.user.emailVerified ? (
              <IonCol>
                <CustomButton href="/main" color="primary">
                  Kembali
                </CustomButton>
              </IonCol>
            ) : (
              <IonCol>
                <IonText>
                  <p>
                    Kirim tautan verifikasi baru dengan memasukkan email dan password Gitpedia kamu:
                  </p>
                </IonText>
                <IonList className={styles.list}>
                  <InputGroup
                    ref={emailRef}
                    value={emailRef.current?.value as string}
                    type="email"
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
            )}
          </IonRow>
          <IonRow>
            <IonCol>
              <CustomButton color="primary" onClick={handleSendVerificationEmail}>
                Kirim
              </CustomButton>
            </IonCol>
          </IonRow>
        </>
      )}
    </IonGrid>
  );
};

export default VerifyEmailForm;
