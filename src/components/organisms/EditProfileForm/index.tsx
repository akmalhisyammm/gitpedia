import { useContext, useRef, useState } from 'react';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonItemGroup,
  IonItemDivider,
  IonLabel,
  useIonPicker,
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
  idCardOutline,
} from 'ionicons/icons';

import { StoreContext } from 'contexts/store';
import { FramedAvatar, CustomButton } from 'components/atoms';
import { InputGroup, SelectGroup } from 'components/molecules';

import type { IStoreItem } from 'types/store';

const EditProfileForm = () => {
  const [avatar, setAvatarUrl] = useState<string>('');
  const [frame, setFrameUrl] = useState<string>('');

  const [presentPicker] = useIonPicker();

  const { items } = useContext(StoreContext);

  const fullnameRef = useRef<HTMLIonInputElement>(null);
  const usernameRef = useRef<HTMLIonInputElement>(null);
  const occupationRef = useRef<HTMLIonInputElement>(null);
  const genderRef = useRef<HTMLIonSelectElement>(null);
  const websiteRef = useRef<HTMLIonInputElement>(null);
  const githubRef = useRef<HTMLIonInputElement>(null);
  const linkedinRef = useRef<HTMLIonInputElement>(null);
  const instagramRef = useRef<HTMLIonInputElement>(null);
  const twitterRef = useRef<HTMLIonInputElement>(null);

  const handleAvatarFrameChange = () => {
    presentPicker({
      mode: 'ios',
      columns: [
        {
          name: 'avatar',
          selectedIndex: items
            .filter((item) => item.type === 'avatar')
            .sort((a, b) => a.price - b.price)
            .indexOf(items.find((item) => item.thumbnail === avatar) as IStoreItem),
          options: items
            .filter((item) => item.type === 'avatar')
            .sort((a, b) => a.price - b.price)
            .map((item) => ({
              text: item.name,
              value: item.thumbnail,
            })),
        },
        {
          name: 'frame',
          selectedIndex: items
            .filter((item) => item.type === 'frame')
            .sort((a, b) => a.price - b.price)
            .indexOf(items.find((item) => item.thumbnail === frame) as IStoreItem),
          options: items
            .filter((item) => item.type === 'frame')
            .sort((a, b) => a.price - b.price)
            .map((item) => ({
              text: item.name,
              value: item.thumbnail,
            })),
        },
      ],
      buttons: [
        {
          text: 'Batalkan',
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

  const handleSave = () => {
    console.log(fullnameRef.current?.value);
    console.log(occupationRef.current?.value);
    console.log(genderRef.current?.value);
    console.log(websiteRef.current?.value);
    console.log(githubRef.current?.value);
    console.log(linkedinRef.current?.value);
    console.log(instagramRef.current?.value);
    console.log(twitterRef.current?.value);
  };

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
              ref={fullnameRef}
              type="text"
              inputMode="text"
              placeholder="Nama Lengkap"
              iconStart={personOutline}
            />
            <InputGroup
              ref={usernameRef}
              type="text"
              inputMode="text"
              placeholder="Username"
              iconStart={idCardOutline}
            />
            <InputGroup
              ref={occupationRef}
              type="text"
              inputMode="text"
              placeholder="Pekerjaan"
              iconStart={schoolOutline}
            />
            <SelectGroup
              ref={genderRef}
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
              <IonLabel>Sosial Media (Opsional)</IonLabel>
            </IonItemDivider>
            <InputGroup
              ref={websiteRef}
              type="text"
              inputMode="text"
              placeholder="Link Website"
              iconStart={globeOutline}
            />
            <InputGroup
              ref={githubRef}
              type="text"
              inputMode="text"
              placeholder="Username GitHub"
              iconStart={logoGithub}
            />
            <InputGroup
              ref={linkedinRef}
              type="text"
              inputMode="text"
              placeholder="Username LinkedIn"
              iconStart={logoLinkedin}
            />
            <InputGroup
              ref={instagramRef}
              type="text"
              inputMode="text"
              placeholder="Username Instagram"
              iconStart={logoInstagram}
            />
            <InputGroup
              ref={twitterRef}
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
          <CustomButton color="primary" onClick={handleSave}>
            Simpan Perubahan
          </CustomButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default EditProfileForm;
