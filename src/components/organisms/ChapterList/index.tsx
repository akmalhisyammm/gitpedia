import { IonGrid, IonRow, IonCol } from '@ionic/react';

import { CustomLink } from 'components/atoms';
import { ChapterCard } from 'components/molecules';

const CHAPTERS = [
  {
    id: 1,
    title: 'Pendahuluan',
    imgSrc: '/assets/img/software-code-testing-pana.svg',
    percentage: 25,
    isLocked: false,
  },
  {
    id: 2,
    title: 'Dasar-Dasar Git',
    imgSrc: '/assets/img/low-code-development-pana.svg',
    percentage: 0,
    isLocked: true,
  },
  {
    id: 3,
    title: 'Bekerja Jarak Jauh',
    imgSrc: '/assets/img/pull-request-pana.svg',
    percentage: 0,
    isLocked: true,
  },
];

const ChapterList = () => {
  return (
    <IonGrid>
      <IonRow>
        {CHAPTERS.map((chapter) => (
          <IonCol size="12" sizeSm="6" key={chapter.id}>
            {!chapter.isLocked ? (
              <CustomLink color="primary" href={`/learn/${chapter.id}`}>
                <ChapterCard
                  title={chapter.title}
                  imgSrc={chapter.imgSrc}
                  percentage={chapter.percentage}
                />
              </CustomLink>
            ) : (
              <ChapterCard
                title={chapter.title}
                imgSrc={chapter.imgSrc}
                percentage={chapter.percentage}
                isLocked
              />
            )}
          </IonCol>
        ))}
      </IonRow>
    </IonGrid>
  );
};

export default ChapterList;
