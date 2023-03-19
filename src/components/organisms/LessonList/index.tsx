import { IonList } from '@ionic/react';
import { useLocation } from 'react-router-dom';

import { CustomLink } from 'components/atoms';
import { LessonItem } from 'components/molecules';

import styles from './LessonList.module.scss';

const LESSONS = [
  {
    id: 1,
    title: 'Konfigurasi Git',
    totalStars: 1,
    isLocked: false,
  },
  {
    id: 2,
    title: 'Mendapatkan Repositori Git',
    totalStars: 2,
    isLocked: false,
  },
  {
    id: 3,
    title: 'Merekam Perubahan pada Repositori',
    totalStars: 0,
    isLocked: true,
  },
];

const LessonList = () => {
  const location = useLocation();

  return (
    <IonList className={styles.list}>
      {LESSONS.map((lesson) => (
        <CustomLink key={lesson.id} href={`${location.pathname}/${lesson.id}`}>
          <LessonItem key={lesson.id} {...lesson} />
        </CustomLink>
      ))}
    </IonList>
  );
};

export default LessonList;
