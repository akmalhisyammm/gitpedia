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
  personOutline,
  keyOutline,
  maleFemaleOutline,
  schoolOutline,
  alertCircle,
  checkmarkCircle,
} from 'ionicons/icons';

import { AuthContext } from 'contexts/auth';
import { CustomButton, CustomLink } from 'components/atoms';
import { InputGroup, SelectGroup } from 'components/molecules';

import styles from './RegisterForm.module.scss';

const RegisterForm = () => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState<boolean>(false);

  const [presentToast] = useIonToast();
  const [presentLoading, dismissLoading] = useIonLoading();

  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const nameRef = useRef<HTMLIonInputElement>(null);
  const occupationRef = useRef<HTMLIonInputElement>(null);
  const genderRef = useRef<HTMLIonSelectElement>(null);
  const emailRef = useRef<HTMLIonInputElement>(null);
  const passwordRef = useRef<HTMLIonInputElement>(null);
  const confirmPasswordRef = useRef<HTMLIonInputElement>(null);

  const handleRegister = async () => {
    const name = nameRef.current?.value as string;
    const occupation = occupationRef.current?.value as string;
    const gender = genderRef.current?.value as 'male' | 'female';
    const email = emailRef.current?.value as string;
    const password = passwordRef.current?.value as string;
    const confirmPassword = confirmPasswordRef.current?.value as string;

    if (!name.trim().length) {
      return presentToast({
        mode: 'ios',
        message: 'Nama harus diisi!',
        color: 'danger',
        duration: 2000,
        icon: alertCircle,
      });
    }

    if (!occupation.trim().length) {
      return presentToast({
        mode: 'ios',
        message: 'Pekerjaan harus diisi!',
        color: 'danger',
        duration: 2000,
        icon: alertCircle,
      });
    }

    if (!gender) {
      return presentToast({
        mode: 'ios',
        message: 'Jenis kelamin harus diisi!',
        color: 'danger',
        duration: 2000,
        icon: alertCircle,
      });
    }

    if (!email.trim().length) {
      return presentToast({
        mode: 'ios',
        message: 'Email harus diisi!',
        color: 'danger',
        duration: 2000,
        icon: alertCircle,
      });
    }

    if (password.length < 6) {
      return presentToast({
        mode: 'ios',
        message: 'Kata sandi minimal 6 karakter!',
        color: 'danger',
        duration: 2000,
        icon: alertCircle,
      });
    }

    if (password !== confirmPassword) {
      return presentToast({
        mode: 'ios',
        message: 'Kata sandi tidak sama!',
        color: 'danger',
        duration: 2000,
        icon: alertCircle,
      });
    }

    try {
      presentLoading({ mode: 'ios', spinner: 'crescent' });

      await authCtx.register({ name, occupation, gender, email, password });

      presentToast({
        mode: 'ios',
        message: 'Berhasil mendaftar, silakan periksa email kamu untuk verifikasi!',
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

  return (
    <IonGrid className={styles.wrapper}>
      <IonRow>
        <IonCol>
          <IonText>
            <h1 className={styles.title}>Daftar</h1>
          </IonText>
        </IonCol>
      </IonRow>

      <IonRow>
        <IonCol size="12">
          <IonList className={styles.list}>
            <InputGroup
              ref={nameRef}
              value={nameRef.current?.value as string}
              type="text"
              inputMode="text"
              placeholder="Nama"
              iconStart={personOutline}
            />
            <InputGroup
              ref={occupationRef}
              value={occupationRef.current?.value as string}
              type="text"
              inputMode="text"
              placeholder="Pekerjaan"
              iconStart={schoolOutline}
            />
            <SelectGroup
              ref={genderRef}
              value={genderRef.current?.value as string}
              type="popover"
              placeholder="Jenis Kelamin"
              iconStart={maleFemaleOutline}
              options={[
                {
                  label: 'Laki-laki',
                  value: 'male',
                },
                {
                  label: 'Perempuan',
                  value: 'female',
                },
              ]}
            />
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
            <InputGroup
              ref={confirmPasswordRef}
              value={confirmPasswordRef.current?.value as string}
              type={isShowConfirmPassword ? 'text' : 'password'}
              placeholder="Ulangi Kata Sandi"
              iconStart={keyOutline}
              iconEnd={isShowConfirmPassword ? eyeOff : eye}
              onToggleType={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
            />
          </IonList>
        </IonCol>
        <IonCol size="12">
          <CustomButton color="primary" onClick={handleRegister}>
            Daftar
          </CustomButton>
        </IonCol>
      </IonRow>

      <IonRow>
        <IonCol>
          <IonText className={styles.footer}>
            Sudah punya akun?{' '}
            <CustomLink href="/auth/login" color="primary" isUnderline>
              Masuk
            </CustomLink>
          </IonText>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default RegisterForm;
