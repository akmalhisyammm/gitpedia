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
  lockClosedOutline,
  eyeOff,
  eye,
  mailOutline,
  alertCircle,
  checkmarkCircle,
} from 'ionicons/icons';

import { EXPIRED_ILLUSTRATION_URL, SECURITY_ILLUSTRATION_URL } from 'constants/images';
import { AuthContext } from 'contexts/auth';
import { CustomButton, CustomImage } from 'components/atoms';
import { InputGroup } from 'components/molecules';
import { LoadingScreen } from 'components/templates';

import styles from './ResetPasswordForm.module.scss';

type ResetPasswordFormProps = {
  oobCode: string;
};

const ResetPasswordForm = ({ oobCode }: ResetPasswordFormProps) => {
  const [currentEmail, setCurrentEmail] = useState<string>('');
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [presentToast] = useIonToast();
  const [presentLoading, dismissLoading] = useIonLoading();

  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const emailRef = useRef<HTMLIonInputElement>(null);
  const newPasswordRef = useRef<HTMLIonInputElement>(null);

  const handleSendResetPasswordEmail = async () => {
    const email = emailRef.current?.value as string;

    if (!email.trim().length) {
      return presentToast({
        mode: 'ios',
        message: 'Email harus diisi!',
        color: 'danger',
        duration: 2000,
        icon: alertCircle,
      });
    }

    try {
      presentLoading({ mode: 'ios', spinner: 'crescent' });

      await authCtx.requestResetPassword({ email });
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

  const handleConfirmResetPassword = async () => {
    const newPassword = newPasswordRef.current?.value as string;

    try {
      presentLoading({ mode: 'ios', spinner: 'crescent' });

      await authCtx.confirmResetPassword({ oobCode, newPassword });
      await authCtx.logout();

      presentToast({
        mode: 'ios',
        message: 'Password berhasil diatur ulang!',
        color: 'success',
        duration: 2000,
        icon: checkmarkCircle,
      });

      history.push('/auth/login');
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
    const getUserEmail = async () => {
      try {
        setIsLoading(true);
        const email = await authCtx.verifyResetPassword({ oobCode });

        setCurrentEmail(email || '');
      } finally {
        setIsLoading(false);
      }
    };

    getUserEmail();
  }, []);

  if (isLoading) return <LoadingScreen />;

  return (
    <IonGrid className={styles.wrapper}>
      {currentEmail.length ? (
        <>
          <IonRow>
            <IonCol>
              <IonText color="primary">
                <h3 className={styles.title}>Atur Ulang Kata Sandi</h3>
                <small>Email: {currentEmail}</small>
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <CustomImage
                src={SECURITY_ILLUSTRATION_URL}
                alt="Security"
                className={styles.illustration}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonText>
                <p>Masukkan kata sandi baru untuk akun Gitpedia kamu:</p>
              </IonText>
              <IonList className={styles.list}>
                <InputGroup
                  ref={newPasswordRef}
                  value={newPasswordRef.current?.value as string}
                  type={isShowPassword ? 'text' : 'password'}
                  placeholder="Kata Sandi Baru"
                  iconStart={lockClosedOutline}
                  iconEnd={isShowPassword ? eyeOff : eye}
                  onToggleType={() => setIsShowPassword(!isShowPassword)}
                />
              </IonList>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <CustomButton color="primary" onClick={handleConfirmResetPassword}>
                Simpan
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
            <IonCol>
              <IonText>
                <p>
                  Kirim tautan atur ulang kata sandi baru dengan memasukkan email Gitpedia kamu:
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
              </IonList>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <CustomButton color="primary" onClick={handleSendResetPasswordEmail}>
                Kirim
              </CustomButton>
            </IonCol>
          </IonRow>
        </>
      )}
    </IonGrid>
  );
};

export default ResetPasswordForm;
