import { useContext, useEffect, useRef, useState } from 'react';
import Countdown, { zeroPad } from 'react-countdown';
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonCard,
  IonCardContent,
  IonButtons,
  IonIcon,
  IonRadioGroup,
  IonItem,
  IonLabel,
  IonRadio,
  useIonToast,
  useIonActionSheet,
  useIonLoading,
} from '@ionic/react';
import { alertCircle, checkmarkCircle, closeCircle, closeOutline } from 'ionicons/icons';

import { UserContext } from 'contexts/user';
import { CustomButton, CustomImage } from 'components/atoms';
import { InputGroup } from 'components/molecules';

import type { IQuiz } from 'types/chapter';

import styles from './QuizModal.module.scss';

type QuizModalProps = {
  data: IQuiz[];
  chapterId: number;
  lessonId: number;
  isOpen: boolean;
  onFinish: () => void;
};

const QuizModal = ({ data, chapterId, lessonId, isOpen, onFinish }: QuizModalProps) => {
  const [number, setNumber] = useState<number>(1);
  const [currentQuiz, setCurrentQuiz] = useState<IQuiz>();
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const [presentToast] = useIonToast();
  const [presentActionSheet] = useIonActionSheet();
  const [presentLoading, dismissLoading] = useIonLoading();

  const userCtx = useContext(UserContext);

  const fillRef = useRef<HTMLIonInputElement>(null);
  const choiceRef = useRef<HTMLIonRadioGroupElement>(null);
  const timerRef = useRef<Countdown>(null);

  const resetAllInputs = () => {
    fillRef.current?.value && (fillRef.current.value = '');
    choiceRef.current?.value && (choiceRef.current.value = '');
  };

  const handleUpdateProgress = async () => {
    if (userCtx.user) {
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
            totalCoins: userCtx.user.progress.totalCoins + correctCount * 100,
            totalStars: userCtx.user.progress.learns.reduce((prev, curr) => prev + curr.stars, 0),
            learns: [
              ...otherLearns,
              {
                ...currentLearn,
                stars: correctCount,
                isPassed: correctCount > 0,
              },
            ],
          });
        } catch (error) {
          if (error instanceof Error) {
            presentToast({
              mode: 'ios',
              message: error.message,
              color: 'danger',
              duration: 3000,
              icon: alertCircle,
            });
          }
        } finally {
          dismissLoading();
        }
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
        duration: 1500,
        icon: checkmarkCircle,
      });
    } else {
      presentToast({
        mode: 'ios',
        message: 'Salah!',
        color: 'danger',
        duration: 1500,
        icon: closeCircle,
      });
    }

    if (number < 3) {
      setNumber((prev) => prev + 1);
      resetAllInputs();
    } else {
      handleUpdateProgress();
      setNumber(1);
      resetAllInputs();
      setIsFinished(true);
    }
  };

  const handleTimeUp = () => {
    if (number < 3) {
      setNumber((prev) => prev + 1);
      resetAllInputs();
    } else {
      handleUpdateProgress();
      setNumber(1);
      resetAllInputs();
      setIsFinished(true);
    }

    fillRef.current?.value && (fillRef.current.value = '');
    choiceRef.current?.value && (choiceRef.current.value = '');
  };

  const handleDismissQuiz = () => {
    presentActionSheet({
      mode: 'ios',
      header: 'Apakah kamu yakin ingin mengakhiri quiz?',
      buttons: [
        {
          text: 'Ya',
          handler: () => {
            setNumber(1);
            resetAllInputs();
            setIsFinished(false);
            onFinish();
          },
        },
        {
          text: 'Tidak',
          role: 'cancel',
        },
      ],
    });
  };

  useEffect(() => {
    setCurrentQuiz(data[number - 1]);
    timerRef.current?.start();
  }, [data, number]);

  return (
    <IonModal isOpen={isOpen} backdropDismiss={false}>
      <IonHeader>
        <IonToolbar color="tertiary">
          <IonTitle>Quiz</IonTitle>
          <IonButtons slot="end" onClick={handleDismissQuiz}>
            <CustomButton>
              <IonIcon slot="icon-only" icon={closeOutline} />
            </CustomButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonGrid className={styles.wrapper}>
          {isFinished ? (
            <>
              {correctCount > 0 ? (
                <>
                  <IonRow>
                    <IonCol>
                      <CustomImage
                        src="https://firebasestorage.googleapis.com/v0/b/gitpedia-dev.appspot.com/o/illustrations%2Fwinners-pana.svg?alt=media&token=5fbafa20-f03d-4680-8123-398b2d9864ee"
                        alt="Illustration"
                        style={{ width: '80%', margin: 'auto' }}
                      />
                    </IonCol>
                  </IonRow>
                  <IonRow className="ion-text-center">
                    <IonCol>
                      <IonText>
                        <h2>Selamat, kamu lulus pada materi ini!</h2>
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
                        src="https://firebasestorage.googleapis.com/v0/b/gitpedia-dev.appspot.com/o/illustrations%2Fanxiety-pana.svg?alt=media&token=56804564-a5d6-4ee6-bf5d-9e233146446a"
                        alt="Illustration"
                        style={{ width: '80%', margin: 'auto' }}
                      />
                    </IonCol>
                  </IonRow>
                  <IonRow className="ion-text-center">
                    <IonCol>
                      <IonText>
                        <h2>Maaf, kamu belum lulus pada materi ini!</h2>
                        <p>Silakan pelajari kembali materi ini dan coba lagi.</p>
                      </IonText>
                    </IonCol>
                  </IonRow>
                </>
              )}
              <IonRow>
                <IonCol>
                  <CustomButton color="primary" onClick={onFinish}>
                    Kembali
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
                    date={Date.now() + 120000}
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
                      <IonText>
                        <h2>{currentQuiz?.question}</h2>
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
                      labelStart="$"
                    />
                  </IonCol>
                ) : (
                  <IonCol>
                    <IonRadioGroup ref={choiceRef}>
                      {currentQuiz?.options?.map((option) => (
                        <IonItem key={option} color="secondary" className={styles.radio}>
                          <IonLabel className="ion-text-wrap">{option}</IonLabel>
                          <IonRadio slot="start" value={option} />
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
      </IonContent>
    </IonModal>
  );
};

export default QuizModal;
