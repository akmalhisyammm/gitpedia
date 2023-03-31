import { forwardRef } from 'react';
import { IonItem, IonIcon, IonSelect, IonSelectOption, IonLabel } from '@ionic/react';

import styles from './SelectGroup.module.scss';

type SelectGroupProps = {
  type: 'action-sheet' | 'alert' | 'popover';
  options: { value: string; label: string }[];
  placeholder?: string;
  labelStart?: string;
  labelEnd?: string;
  iconStart?: string;
  iconEnd?: string;
};

const SelectGroup = (
  { type, options, placeholder, labelStart, labelEnd, iconStart, iconEnd }: SelectGroupProps,
  ref: React.Ref<HTMLIonSelectElement>
) => {
  return (
    <IonItem className={styles.item}>
      {labelStart && (
        <IonLabel slot="start" className={styles.labelStart}>
          {labelStart}
        </IonLabel>
      )}
      {iconStart && (
        <IonIcon icon={iconStart} color="primary" slot="start" className={styles.iconStart} />
      )}
      <IonSelect ref={ref} interface={type} placeholder={placeholder} className={styles.select}>
        {options.map((option) => (
          <IonSelectOption key={option.value} value={option.value}>
            {option.label}
          </IonSelectOption>
        ))}
      </IonSelect>
      {labelEnd && <IonLabel slot="end">{labelEnd}</IonLabel>}
      {iconEnd && <IonIcon slot="end" icon={iconEnd} className={styles.iconEnd} />}
    </IonItem>
  );
};

export default forwardRef(SelectGroup);
