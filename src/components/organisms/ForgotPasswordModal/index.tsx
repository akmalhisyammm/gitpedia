import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonText,
} from '@ionic/react';
import { mailOutline } from 'ionicons/icons';
import { useRef } from 'react';

import { InputGroup } from 'components/molecules';

type ForgotPasswordModalProps = {
  isOpen: boolean;
  onRequest: () => void;
  onDismiss: () => void;
};

const ForgotPasswordModal = ({ isOpen, onRequest, onDismiss }: ForgotPasswordModalProps) => {
  const forgotPasswordEmailRef = useRef<HTMLIonInputElement>(null);

  return (
    <IonModal isOpen={isOpen}>
      <IonHeader>
        <IonToolbar color="tertiary">
          <IonTitle>Atur Ulang Kata Sandi</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonGrid>
          <IonRow className="ion-text-center ion-margin-top">
            <IonCol size="12">
              <IonText>Masukkan email yang telah kamu daftarkan pada aplikasi:</IonText>
            </IonCol>
            <IonCol size="12">
              <InputGroup
                ref={forgotPasswordEmailRef}
                type="email"
                inputMode="email"
                placeholder="Email"
                iconStart={mailOutline}
              />
            </IonCol>
          </IonRow>

          <IonRow className="ion-text-center">
            <IonCol>
              <IonButton color="primary" expand="block" shape="round" onClick={onRequest}>
                Kirim
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton color="secondary" expand="block" shape="round" onClick={onDismiss}>
                Batalkan
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonModal>
  );
};

export default ForgotPasswordModal;
