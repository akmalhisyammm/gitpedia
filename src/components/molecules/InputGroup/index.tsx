import { forwardRef } from 'react';
import { IonItem, IonIcon, IonInput, IonLabel } from '@ionic/react';

import styles from './InputGroup.module.scss';

type InputGroupProps = {
  type:
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'month'
    | 'number'
    | 'password'
    | 'search'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week';
  inputMode?: 'decimal' | 'email' | 'none' | 'numeric' | 'search' | 'tel' | 'text' | 'url';
  placeholder?: string;
  labelStart?: string;
  labelEnd?: string;
  iconStart?: string;
  iconEnd?: string;
  onToggleType?: React.MouseEventHandler<HTMLIonIconElement>;
};

const InputGroup = (
  {
    type,
    inputMode,
    placeholder,
    labelStart,
    labelEnd,
    iconStart,
    iconEnd,
    onToggleType,
  }: InputGroupProps,
  ref: React.Ref<HTMLIonInputElement>
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
      <IonInput ref={ref} type={type} inputMode={inputMode} placeholder={placeholder} />
      {labelEnd && <IonLabel slot="end">{labelEnd}</IonLabel>}
      {iconEnd && (
        <IonIcon slot="end" icon={iconEnd} className={styles.iconEnd} onClick={onToggleType} />
      )}
    </IonItem>
  );
};

export default forwardRef(InputGroup);
