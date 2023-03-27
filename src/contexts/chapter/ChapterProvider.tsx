import { useEffect, useState } from 'react';

import { ChapterContext } from './ChapterContext';
import { getAllChapters } from 'lib/firebase';
import { IChapter } from 'types/chapter';

type ChapterProviderProps = {
  children: React.ReactNode;
};

export const ChapterProvider = ({ children }: ChapterProviderProps) => {
  const [chapters, setChapters] = useState<IChapter[]>([]);

  useEffect(() => {
    const fetchChapters = async () => {
      const data = await getAllChapters();

      setChapters(data);
    };

    fetchChapters();
  }, []);

  return <ChapterContext.Provider value={{ chapters }}>{children}</ChapterContext.Provider>;
};
