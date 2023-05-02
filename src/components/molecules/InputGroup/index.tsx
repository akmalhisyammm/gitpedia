import { forwardRef } from 'react';
import { IonItem, IonIcon, IonInput } from '@ionic/react';

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
  value?: string;
  placeholder?: string;
  label?: string;
  iconStart?: string;
  iconEnd?: string;
  isDisabled?: boolean;
  onToggleType?: React.MouseEventHandler<HTMLIonIconElement>;
};

const InputGroup = (
  {
    type,
    inputMode,
    value,
    placeholder,
    label,
    iconStart,
    iconEnd,
    isDisabled,
    onToggleType,
  }: InputGroupProps,
  ref: React.Ref<HTMLIonInputElement>
) => {
  return (
    <IonItem className={styles.item}>
      {iconStart && (
        <IonIcon icon={iconStart} color="primary" slot="start" className={styles.iconStart} />
      )}
      <IonInput
        mode="ios"
        ref={ref}
        value={value}
        type={type}
        inputMode={inputMode || 'text'}
        label={label}
        labelPlacement="start"
        placeholder={placeholder}
        disabled={isDisabled}
      />
      {iconEnd && (
        <IonIcon slot="end" icon={iconEnd} className={styles.iconEnd} onClick={onToggleType} />
      )}
    </IonItem>
  );
};

export default forwardRef(InputGroup);
