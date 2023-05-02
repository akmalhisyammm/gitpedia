import { forwardRef } from 'react';
import { IonItem, IonIcon, IonSelect, IonSelectOption } from '@ionic/react';

import styles from './SelectGroup.module.scss';

type SelectGroupProps = {
  type: 'action-sheet' | 'alert' | 'popover';
  options: { value: string; label: string }[];
  value?: string;
  placeholder?: string;
  iconStart?: string;
  iconEnd?: string;
};

const SelectGroup = (
  { type, options, value, placeholder, iconStart, iconEnd }: SelectGroupProps,
  ref: React.Ref<HTMLIonSelectElement>
) => {
  return (
    <IonItem className={styles.item}>
      {iconStart && (
        <IonIcon icon={iconStart} color="primary" slot="start" className={styles.iconStart} />
      )}
      <IonSelect mode="ios" ref={ref} value={value} interface={type} placeholder={placeholder}>
        {options.map((option) => (
          <IonSelectOption key={option.value} value={option.value}>
            {option.label}
          </IonSelectOption>
        ))}
      </IonSelect>
      {iconEnd && <IonIcon slot="end" icon={iconEnd} className={styles.iconEnd} />}
    </IonItem>
  );
};

export default forwardRef(SelectGroup);
