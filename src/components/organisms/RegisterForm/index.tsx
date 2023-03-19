import { IonGrid, IonRow, IonCol, IonText, IonList } from '@ionic/react';
import {
  mailOutline,
  lockClosedOutline,
  eyeOff,
  eye,
  personOutline,
  keyOutline,
} from 'ionicons/icons';
import { useState, useRef } from 'react';

import { CustomButton, CustomLink } from 'components/atoms';
import { InputGroup } from 'components/molecules';

import styles from './RegisterForm.module.scss';

const RegisterForm = () => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState<boolean>(false);

  const fullNameRef = useRef<HTMLIonInputElement>(null);
  const emailRef = useRef<HTMLIonInputElement>(null);
  const passwordRef = useRef<HTMLIonInputElement>(null);
  const confirmPasswordRef = useRef<HTMLIonInputElement>(null);

  const handleRegister = async () => {
    console.log('Register');
  };

  const enterKeyDown = (e: React.KeyboardEvent<HTMLIonInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleRegister();
    }
  };

  return (
    <IonGrid className={styles.wrapper}>
      <IonRow>
        <IonCol>
          <h1 className={styles.header}>
            <IonText>Daftar</IonText>
          </h1>

          <IonRow>
            <IonCol>
              <IonList className={styles.list}>
                <InputGroup
                  ref={fullNameRef}
                  type="text"
                  inputMode="text"
                  placeholder="Nama Lengkap"
                  iconStart={personOutline}
                  onKeyDown={(e) => enterKeyDown(e)}
                />
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
                <InputGroup
                  ref={confirmPasswordRef}
                  type={isShowPassword ? 'text' : 'password'}
                  placeholder="Ulangi Kata Sandi"
                  iconStart={keyOutline}
                  iconEnd={isShowPassword ? eyeOff : eye}
                  onKeyDown={(e) => enterKeyDown(e)}
                  onToggleType={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
                />
              </IonList>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <CustomButton color="primary" onClick={handleRegister}>
                Daftar
              </CustomButton>
            </IonCol>
          </IonRow>
        </IonCol>
      </IonRow>

      <IonRow>
        <IonCol>
          <IonText className={styles.footer}>
            Sudah punya akun?{' '}
            <CustomLink color="primary" href="/auth/login" isUnderline>
              Masuk
            </CustomLink>
          </IonText>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default RegisterForm;
