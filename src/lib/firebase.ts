import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

import { firebaseConfig } from 'config';
import { IChapter } from 'types/chapter';
import { IStoreItem } from 'types/store';

const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);

const chaptersCollection = collection(firestore, 'chapters');
const storesCollection = collection(firestore, 'stores');

const getAllChapters = async () => {
  const snapshot = await getDocs(chaptersCollection);
  const chapters = snapshot.docs.map((doc) => ({ ...(doc.data() as IChapter) }));

  return chapters;
};

const getAllStoreItems = async () => {
  const snapshot = await getDocs(storesCollection);
  const stores = snapshot.docs.map((doc) => ({ ...(doc.data() as IStoreItem) }));

  return stores;
};

export { getAllChapters, getAllStoreItems };
