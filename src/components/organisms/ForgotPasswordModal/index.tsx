import { useContext, useRef } from 'react';
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  useIonLoading,
  useIonToast,
  IonList,
} from '@ionic/react';
import { alertCircle, checkmarkCircle, mailOutline } from 'ionicons/icons';

import { AuthContext } from 'contexts/auth';
import { CustomButton } from 'components/atoms';
import { InputGroup } from 'components/molecules';

import styles from './ForgotPasswordModal.module.scss';

type ForgotPasswordModalProps = {
  isOpen: boolean;
  onDismiss: () => void;
};

const ForgotPasswordModal = ({ isOpen, onDismiss }: ForgotPasswordModalProps) => {
  const [presentToast] = useIonToast();
  const [presentLoading, dismissLoading] = useIonLoading();

  const authCtx = useContext(AuthContext);

  const emailRef = useRef<HTMLIonInputElement>(null);

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

      presentToast({
        mode: 'ios',
        message: 'Berhasil terkirim, silakan periksa email kamu!',
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

      onDismiss();
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
    <IonModal isOpen={isOpen}>
      <IonHeader>
        <IonToolbar color="tertiary">
          <IonTitle>Atur Ulang Kata Sandi</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonGrid className="ion-text-center">
          <IonRow>
            <IonCol>
              <IonText>
                <p>Kirim tautan atur ulang kata sandi dengan memasukkan email Gitpedia kamu:</p>
              </IonText>
              <IonList className={styles.list}>
                <InputGroup
                  ref={emailRef}
                  value={emailRef.current?.value as string}
                  type="email"
                  inputMode="email"
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
            <IonCol>
              <CustomButton color="secondary" onClick={onDismiss}>
                Batalkan
              </CustomButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonModal>
  );
};

export default ForgotPasswordModal;
