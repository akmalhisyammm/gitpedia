import { IonSegment, IonSegmentButton } from '@ionic/react';

type LeaderboardSegmentProps = {
  selectedValue: string;
  onSelect: (value: string) => void;
};

const LeaderboardSegment = ({ selectedValue, onSelect }: LeaderboardSegmentProps) => {
  const handleSegmentChange = (event: CustomEvent) => {
    onSelect(event.detail.value);
  };

  return (
    <IonSegment value={selectedValue} onIonChange={handleSegmentChange}>
      <IonSegmentButton value="globals">Global</IonSegmentButton>
      <IonSegmentButton value="friends">Teman</IonSegmentButton>
    </IonSegment>
  );
};

export default LeaderboardSegment;
