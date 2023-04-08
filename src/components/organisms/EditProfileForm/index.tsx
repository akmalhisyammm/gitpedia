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

import styles from './EditProfileForm.module.scss';

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
    const website = websiteRef.current?.value as string;
    const github = githubRef.current?.value as string;
    const linkedin = linkedinRef.current?.value as string;
    const instagram = instagramRef.current?.value as string;
    const twitter = twitterRef.current?.value as string;

    const socials = [] as {
      name: 'Website' | 'GitHub' | 'LinkedIn' | 'Instagram' | 'Twitter';
      url: string;
    }[];

    if (website && website.trim().length) {
      socials.push({
        name: 'Website',
        url:
          website.includes('https://') || website.includes('http://')
            ? website
            : `https://${website}`,
      });
    }

    if (github && github.trim().length) {
      socials.push({
        name: 'GitHub',
        url: `https://github.com/${github}`,
      });
    }

    if (linkedin && linkedin.trim().length) {
      socials.push({
        name: 'LinkedIn',
        url: `https://linkedin.com/in/${linkedin}`,
      });
    }

    if (instagram && instagram.trim().length) {
      socials.push({
        name: 'Instagram',
        url: `https://instagram.com/${instagram}`,
      });
    }

    if (twitter && twitter.trim().length) {
      socials.push({
        name: 'Twitter',
        url: `https://twitter.com/${twitter}`,
      });
    }

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

    if (!userCtx.user) return;

    try {
      presentLoading({ mode: 'ios', spinner: 'crescent' });

      if (!userCtx.user.profile.isCompleted && socials.length === 5) {
        await userCtx.updateProgress({
          ...userCtx.user.progress,
          totalCoins: userCtx.user.progress.totalCoins + 250,
        });
      }

      await userCtx.updateProfile({
        name,
        occupation,
        gender,
        avatar,
        frame,
        socials,
        isCompleted: userCtx.user.profile.isCompleted || socials.length === 5,
      });

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

    setAvatarUrl(userCtx.user.profile.avatar);
    setFrameUrl(userCtx.user.profile.frame);
  }, []);

  return (
    <IonGrid>
      <IonRow>
        <IonCol size="12" className={`${styles.imageWrapper} ion-margin-vertical`}>
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
              value={userCtx.user?.profile.name}
              type="text"
              inputMode="text"
              placeholder="Nama Lengkap"
              iconStart={personOutline}
            />
            <InputGroup
              ref={occupationRef}
              value={userCtx.user?.profile.occupation}
              type="text"
              inputMode="text"
              placeholder="Pekerjaan"
              iconStart={schoolOutline}
            />
            <SelectGroup
              ref={genderRef}
              value={userCtx.user?.profile.gender}
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
              value={userCtx.user?.profile.socials.find((social) => social.name === 'Website')?.url}
              type="text"
              inputMode="text"
              placeholder="Link Website"
              iconStart={globeOutline}
            />
            <InputGroup
              ref={githubRef}
              value={
                userCtx.user?.profile.socials
                  .find((social) => social.name === 'GitHub')
                  ?.url.split('/')[3]
              }
              type="text"
              inputMode="text"
              placeholder="Username GitHub"
              iconStart={logoGithub}
            />
            <InputGroup
              ref={linkedinRef}
              value={
                userCtx.user?.profile.socials
                  .find((social) => social.name === 'LinkedIn')
                  ?.url.split('/')[4]
              }
              type="text"
              inputMode="text"
              placeholder="Username LinkedIn"
              iconStart={logoLinkedin}
            />
            <InputGroup
              ref={instagramRef}
              value={
                userCtx.user?.profile.socials
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
                userCtx.user?.profile.socials
                  .find((social) => social.name === 'Twitter')
                  ?.url.split('/')[3]
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
