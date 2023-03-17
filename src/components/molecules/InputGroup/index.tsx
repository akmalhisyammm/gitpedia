import { IonItem, IonIcon, IonInput } from '@ionic/react';

import styles from './InputGroup.module.scss';

type InputGroupProps = {
  ref: React.RefObject<HTMLIonInputElement>;
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
  iconStart?: string;
  iconEnd?: string;
  onToggleType?: React.MouseEventHandler<HTMLIonIconElement>;
  onKeyDown?: (e: React.KeyboardEvent<HTMLIonInputElement>) => void;
};

const InputGroup = ({
  ref,
  type,
  inputMode,
  placeholder,
  iconStart,
  iconEnd,
  onToggleType,
  onKeyDown,
}: InputGroupProps) => {
  return (
    <IonItem className={styles.item}>
      {iconStart && (
        <IonIcon icon={iconStart} color="primary" slot="start" className={styles.iconStart} />
      )}
      <IonInput
        ref={ref}
        type={type}
        inputMode={inputMode}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        required
      />
      {iconEnd && (
        <IonIcon slot="end" icon={iconEnd} className={styles.iconEnd} onClick={onToggleType} />
      )}
    </IonItem>
  );
};

export default InputGroup;
