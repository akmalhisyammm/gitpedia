import { useEffect, useState } from 'react';
import { getDocs } from 'firebase/firestore';

import { ChapterContext } from './ChapterContext';
import { chaptersCollection } from 'lib/firebase';

import type { IChapter } from 'types/chapter';

type ChapterProviderProps = {
  children: React.ReactNode;
};

export const ChapterProvider = ({ children }: ChapterProviderProps) => {
  const [chapters, setChapters] = useState<IChapter[]>([]);

  useEffect(() => {
    const getAllChapters = async () => {
      const snapshot = await getDocs(chaptersCollection);
      const data = snapshot.docs.map((doc) => ({ ...(doc.data() as IChapter) }));

      const sortedData = data
        .sort((a, b) => a.id - b.id)
        .map((item) => ({
          ...item,
          lessons: item.lessons.sort((a, b) => a.id - b.id),
        }));

      setChapters(sortedData);
    };

    getAllChapters();
  }, []);

  return <ChapterContext.Provider value={{ chapters }}>{children}</ChapterContext.Provider>;
};
