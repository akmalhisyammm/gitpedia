import { createContext } from 'react';

import type { IChapter } from 'types/chapter';

interface IContext {
  chapters: IChapter[];
}

export const ChapterContext = createContext<IContext>({ chapters: [] });
