import { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonItemGroup,
  IonItemDivider,
  IonLabel,
  useIonPicker,
  useIonToast,
  useIonLoading,
} from '@ionic/react';
import {
  personOutline,
  maleFemaleOutline,
  globeOutline,
  logoGithub,
  logoLinkedin,
  logoInstagram,
  logoTwitter,
  schoolOutline,
  alertCircle,
  checkmarkCircle,
} from 'ionicons/icons';

import { UserContext } from 'contexts/user';
import { FramedAvatar, CustomButton } from 'components/atoms';
import { InputGroup, SelectGroup } from 'components/molecules';

import type { IUserItem } from 'types/user';

const EditProfileForm = () => {
  const [avatar, setAvatarUrl] = useState<string>('');
  const [frame, setFrameUrl] = useState<string>('');

  const [presentPicker] = useIonPicker();
  const [presentToast] = useIonToast();
  const [presentLoading, dismissLoading] = useIonLoading();

  const history = useHistory();
  const userCtx = useContext(UserContext);

  const nameRef = useRef<HTMLIonInputElement>(null);
  const occupationRef = useRef<HTMLIonInputElement>(null);
  const genderRef = useRef<HTMLIonSelectElement>(null);
  const websiteRef = useRef<HTMLIonInputElement>(null);
  const githubRef = useRef<HTMLIonInputElement>(null);
  const linkedinRef = useRef<HTMLIonInputElement>(null);
  const instagramRef = useRef<HTMLIonInputElement>(null);
  const twitterRef = useRef<HTMLIonInputElement>(null);

  const handleAvatarFrameChange = () => {
    if (!userCtx.user) return;

    presentPicker({
      mode: 'ios',
      columns: [
        {
          name: 'avatar',
          selectedIndex:
            userCtx.user.items
              .filter((item) => item.type === 'avatar')
              .sort((a, b) => a.id - b.id)
              .indexOf(userCtx.user.items.find((item) => item.thumbnail === avatar) as IUserItem) +
            1,
          options: [
            {
              text: 'Default',
              value: '',
            },
            ...userCtx.user.items
              .filter((item) => item.type === 'avatar')
              .sort((a, b) => a.id - b.id)
              .map((item) => ({
                text: item.name,
                value: item.thumbnail,
              })),
          ],
        },
        {
          name: 'frame',
          selectedIndex:
            userCtx.user.items
              .filter((item) => item.type === 'frame')
              .sort((a, b) => a.id - b.id)
              .indexOf(userCtx.user.items.find((item) => item.thumbnail === frame) as IUserItem) +
            1,
          options: [
            {
              text: 'Default',
              value: '',
            },
            ...userCtx.user.items
              .filter((item) => item.type === 'frame')
              .sort((a, b) => a.id - b.id)
              .map((item) => ({
                text: item.name,
                value: item.thumbnail,
              })),
          ],
        },
      ],
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
        },
        {
          text: 'Ganti',
          handler: (value) => {
            setAvatarUrl(value.avatar.value);
            setFrameUrl(value.frame.value);
          },
        },
      ],
    });
  };

  const handleSubmit = async () => {
    const name = nameRef.current?.value as string;
    const occupation = occupationRef.current?.value as string;
    const gender = genderRef.current?.value as 'male' | 'female';
    const socials = [] as {
      name: 'Website' | 'GitHub' | 'LinkedIn' | 'Instagram' | 'Twitter';
      url: string;
    }[];

    if (websiteRef.current?.value) {
      socials.push({
        name: 'Website',
        url: websiteRef.current?.value as string,
      });
    }

    if (githubRef.current?.value) {
      socials.push({
        name: 'GitHub',
        url: `https://github.com/${githubRef.current?.value as string}`,
      });
    }

    if (linkedinRef.current?.value) {
      socials.push({
        name: 'LinkedIn',
        url: `https://linkedin.com/in/${linkedinRef.current?.value as string}`,
      });
    }

    if (instagramRef.current?.value) {
      socials.push({
        name: 'Instagram',
        url: `https://instagram.com/${instagramRef.current?.value as string}`,
      });
    }

    if (twitterRef.current?.value) {
      socials.push({
        name: 'Twitter',
        url: `https://twitter.com/${twitterRef.current?.value as string}`,
      });
    }

    try {
      presentLoading({ mode: 'ios', spinner: 'crescent' });

      await userCtx.updateProfile({ name, occupation, gender, avatar, frame, socials });

      presentToast({
        mode: 'ios',
        message: 'Profil berhasil diubah!',
        color: 'success',
        duration: 2000,
        icon: checkmarkCircle,
      });

      history.replace('/main/profile');
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
    if (!userCtx.user) return;

    setAvatarUrl(userCtx.user.avatar);
    setFrameUrl(userCtx.user.frame);
  }, []);

  return (
    <IonGrid>
      <IonRow>
        <IonCol
          size="12"
          className="ion-margin-vertical"
          style={{ display: 'flex', justifyContent: 'center' }}>
          <FramedAvatar avatar={avatar} frame={frame} width={130} />
        </IonCol>
        <IonCol size="12">
          <CustomButton color="secondary" onClick={handleAvatarFrameChange}>
            Ubah Avatar / Bingkai
          </CustomButton>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItemGroup>
            <IonItemDivider>
              <IonLabel>Informasi Pribadi</IonLabel>
            </IonItemDivider>

            <InputGroup
              ref={nameRef}
              value={userCtx.user?.name}
              type="text"
              inputMode="text"
              placeholder="Nama Lengkap"
              iconStart={personOutline}
            />
            <InputGroup
              ref={occupationRef}
              value={userCtx.user?.occupation}
              type="text"
              inputMode="text"
              placeholder="Pekerjaan"
              iconStart={schoolOutline}
            />
            <SelectGroup
              ref={genderRef}
              value={userCtx.user?.gender}
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
          </IonItemGroup>
          <IonItemGroup>
            <IonItemDivider>
              <IonLabel>Media Sosial (Opsional)</IonLabel>
            </IonItemDivider>
            <InputGroup
              ref={websiteRef}
              value={userCtx.user?.socials.find((social) => social.name === 'Website')?.url}
              type="text"
              inputMode="text"
              placeholder="Link Website"
              iconStart={globeOutline}
            />
            <InputGroup
              ref={githubRef}
              value={
                userCtx.user?.socials.find((social) => social.name === 'GitHub')?.url.split('/')[3]
              }
              type="text"
              inputMode="text"
              placeholder="Username GitHub"
              iconStart={logoGithub}
            />
            <InputGroup
              ref={linkedinRef}
              value={
                userCtx.user?.socials
                  .find((social) => social.name === 'LinkedIn')
                  ?.url.split('/')[3]
              }
              type="text"
              inputMode="text"
              placeholder="Username LinkedIn"
              iconStart={logoLinkedin}
            />
            <InputGroup
              ref={instagramRef}
              value={
                userCtx.user?.socials
                  .find((social) => social.name === 'Instagram')
                  ?.url.split('/')[3]
              }
              type="text"
              inputMode="text"
              placeholder="Username Instagram"
              iconStart={logoInstagram}
            />
            <InputGroup
              ref={twitterRef}
              value={
                userCtx.user?.socials.find((social) => social.name === 'Twitter')?.url.split('/')[3]
              }
              type="text"
              inputMode="text"
              placeholder="Username Twitter"
              iconStart={logoTwitter}
            />
          </IonItemGroup>
        </IonCol>
      </IonRow>
      <IonRow className="ion-margin-bottom">
        <IonCol>
          <CustomButton color="primary" onClick={handleSubmit}>
            Simpan Perubahan
          </CustomButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default EditProfileForm;
