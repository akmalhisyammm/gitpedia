import { useContext, useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Countdown, { zeroPad } from 'react-countdown';
import ReactMarkdown from 'react-markdown';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonCard,
  IonCardContent,
  IonRadioGroup,
  IonRadio,
  useIonToast,
  useIonLoading,
  IonItem,
  IonLabel,
} from '@ionic/react';
import { alertCircle, checkmarkCircle, closeCircle } from 'ionicons/icons';

import { COIN_ICON_URL, FAILED_ILLUSTRATION_URL, PASSED_ILLUSTRATION_URL } from 'constants/images';
import { ChapterContext } from 'contexts/chapter';
import { UserContext } from 'contexts/user';
import { CustomButton, CustomImage } from 'components/atoms';
import { InputGroup } from 'components/molecules';
import { fyShuffle } from 'utils/fyShuffle';

import type { IQuiz } from 'types/chapter';

import styles from './QuizForm.module.scss';

type QuizFormProps = {
  chapterId: number;
  lessonId: number;
};

const QuizForm = ({ chapterId, lessonId }: QuizFormProps) => {
  const [quiz, setQuiz] = useState<IQuiz[]>([]);
  const [currentQuiz, setCurrentQuiz] = useState<IQuiz>();
  const [number, setNumber] = useState<number>(1);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const [presentToast] = useIonToast();
  const [presentLoading, dismissLoading] = useIonLoading();

  const history = useHistory();
  const location = useLocation();

  const chapterCtx = useContext(ChapterContext);
  const userCtx = useContext(UserContext);

  const fillRef = useRef<HTMLIonInputElement>(null);
  const choiceRef = useRef<HTMLIonRadioGroupElement>(null);
  const timerRef = useRef<Countdown>(null);

  const resetAllInputs = () => {
    fillRef.current?.value && (fillRef.current.value = '');
    choiceRef.current?.value && (choiceRef.current.value = '');
  };

  const handleUpdateProgress = async () => {
    if (!userCtx.user) return;

    // Get current learn
    const currentLearn = userCtx.user.progress.learns.find(
      (learn) => learn.chapterId === chapterId && learn.lessonId === lessonId
    );

    // Get other learns
    const otherLearns = userCtx.user.progress.learns.filter(
      (learn) => learn.chapterId !== chapterId || learn.lessonId !== lessonId
    );

    if (currentLearn) {
      try {
        presentLoading({ mode: 'ios', spinner: 'crescent' });

        await userCtx.updateProgress({
          ...userCtx.user.progress,
          totalCoins: userCtx.user.progress.totalCoins + correctCount * 50,
          totalStars:
            correctCount > currentLearn.stars
              ? userCtx.user.progress.totalStars + correctCount - currentLearn.stars
              : userCtx.user.progress.totalStars,
          totalExp: userCtx.user.progress.totalExp + correctCount * 10,
          learns: [
            ...otherLearns,
            {
              ...currentLearn,
              stars: correctCount > currentLearn.stars ? correctCount : currentLearn.stars,
              isPassed: correctCount > 0 || currentLearn.isPassed,
            },
          ],
          lastUpdated: Date.now(),
        });
      } catch (error) {
        if (error instanceof Error) {
          presentToast({
            mode: 'ios',
            message: error.message,
            color: 'danger',
            duration: 2000,
            icon: alertCircle,
          });
        }
      } finally {
        dismissLoading();
      }
    }
  };

  const handleSubmit = () => {
    const fill = fillRef.current?.value as string;
    const choice = choiceRef.current?.value as string;

    if (currentQuiz && [fill, choice].includes(currentQuiz.answer)) {
      setCorrectCount((prev) => prev + 1);
      presentToast({
        mode: 'ios',
        message: 'Benar!',
        color: 'success',
        duration: 1000,
        icon: checkmarkCircle,
      });
    } else {
      presentToast({
        mode: 'ios',
        message: 'Salah!',
        color: 'danger',
        duration: 1000,
        icon: closeCircle,
      });
    }

    setNumber((prev) => prev + 1);
    resetAllInputs();
  };

  const handleTimeUp = () => {
    setNumber((prev) => prev + 1);
    resetAllInputs();

    fillRef.current?.value && (fillRef.current.value = '');
    choiceRef.current?.value && (choiceRef.current.value = '');
  };

  useEffect(() => {
    if (!chapterCtx.chapters.length) {
      const splittedCurrentPath = location.pathname.split('/');
      splittedCurrentPath.pop();

      return history.replace(splittedCurrentPath.join('/'));
    }

    // Get current lesson quiz
    const lessonQuiz = chapterCtx.chapters[chapterId - 1].lessons[lessonId - 1].quiz;

    // Shuffle quiz using Fisher-Yates Shuffle Algorithm
    const shuffledQuiz = fyShuffle(lessonQuiz);

    // Set shuffled quiz to state
    setQuiz(shuffledQuiz);
  }, []);

  useEffect(() => {
    if (number <= 3) {
      setCurrentQuiz(quiz[number - 1]);
      timerRef.current?.start();
    } else {
      handleUpdateProgress();
      setNumber(1);
      resetAllInputs();
      setIsFinished(true);
    }
  }, [quiz, number]);

  return (
    <IonGrid className={styles.wrapper}>
      {isFinished ? (
        <>
          {correctCount > 0 ? (
            <>
              <IonRow>
                <IonCol>
                  <CustomImage
                    src={PASSED_ILLUSTRATION_URL}
                    alt="Passed"
                    className={styles.illustration}
                  />
                </IonCol>
              </IonRow>
              <IonRow className="ion-text-center">
                <IonCol>
                  <IonText className={styles.info}>
                    <div>
                      <small>
                        Kamu mendapatkan +{correctCount * 10} XP dan +{correctCount * 50}
                      </small>
                      <img src={COIN_ICON_URL} alt="Coin" width={14} className={styles.icon} />
                    </div>
                    <h3>Selamat, kamu lulus pada materi ini!</h3>
                    <p>Silahkan lanjut ke materi berikutnya.</p>
                  </IonText>
                </IonCol>
              </IonRow>
            </>
          ) : (
            <>
              <IonRow>
                <IonCol>
                  <CustomImage
                    src={FAILED_ILLUSTRATION_URL}
                    alt="Failed"
                    className={styles.illustration}
                  />
                </IonCol>
              </IonRow>
              <IonRow className="ion-text-center">
                <IonCol>
                  <IonText className={styles.info}>
                    <h3>Maaf, kamu belum lulus pada materi ini!</h3>
                    <p>Silakan pelajari kembali materi ini dan coba lagi.</p>
                  </IonText>
                </IonCol>
              </IonRow>
            </>
          )}
          <IonRow>
            <IonCol>
              <CustomButton color="primary" onClick={() => history.replace('/main')}>
                Kembali ke Beranda
              </CustomButton>
            </IonCol>
          </IonRow>
        </>
      ) : (
        <>
          <IonRow>
            <IonCol className="ion-text-start">
              <IonText>{number}/3</IonText>
            </IonCol>
            <IonCol className="ion-text-end">
              <Countdown
                ref={timerRef}
                date={Date.now() + 60000}
                onComplete={handleTimeUp}
                renderer={({ minutes, seconds }) => (
                  <IonText>
                    {zeroPad(minutes)}:{zeroPad(seconds)}
                  </IonText>
                )}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard color="tertiary" className={styles.card}>
                <IonCardContent>
                  <IonText className={styles.question}>
                    {currentQuiz && (
                      <ReactMarkdown>{currentQuiz.question.replaceAll('\\n', '\n')}</ReactMarkdown>
                    )}
                  </IonText>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            {currentQuiz?.type === 'fill' ? (
              <IonCol>
                <InputGroup
                  ref={fillRef}
                  type="text"
                  inputMode="text"
                  placeholder="Ketik perintah di sini..."
                  label="$"
                />
              </IonCol>
            ) : (
              <IonCol>
                <IonRadioGroup ref={choiceRef}>
                  {currentQuiz?.options?.map((option) => (
                    <IonItem key={option} color="secondary" className={styles.radio}>
                      <IonLabel className={`ion-text-wrap ${styles.answer}`}>
                        <ReactMarkdown>{option}</ReactMarkdown>{' '}
                      </IonLabel>
                      <IonRadio slot="start" value={option} legacy className={styles.radioInner} />
                    </IonItem>
                  ))}
                </IonRadioGroup>
              </IonCol>
            )}
          </IonRow>
          <IonRow>
            <IonCol>
              <CustomButton color="primary" onClick={handleSubmit}>
                Periksa
              </CustomButton>
            </IonCol>
          </IonRow>
        </>
      )}
    </IonGrid>
  );
};

export default QuizForm;
