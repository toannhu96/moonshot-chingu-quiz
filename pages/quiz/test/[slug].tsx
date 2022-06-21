/*
  This page will load at the url "/quiz/:slug"
*/

import { useState } from "react";
import {
  AnswersTileSection,
  NextQuestionBtnContainer,
  SubmitQuizBtnContainer,
  AnswerTileContainerLink,
  ContentWrapper,
} from "~/components/quizSingle/styles";
import PageHeader from "~/components/shared/PageHeader";
import QuestionHeader from "~/components/quizSingle/QuestionHeader";
import { AnswerTileContainer } from "~/components/quizSingle/AnswerTileContainer";
import NextQuestionBtn from "~/components/quizSingle/NextQuestionBtn";
import PreviousQuestionBtn from "~/components/quizSingle/PreviousQuestionBtn";
import SubmitQuizBtn from "~/components/quizSingle/SubmitQuizBtn";
import ResultView from "~/components/quizSingle/ResultView";
import db from "~/db";
import { Question } from "~/models/ChinguQuiz/Question";
import { QuizRecord } from "~/models/ChinguQuiz/QuizRecord";
import { Answer } from "~/models/ChinguQuiz/Answer";
import shuffle from "shuffle-array";

interface QuizProps {
  quizTitle: string;
  quizQuestions: Question[];
}

export default function Quiz({ quizTitle, quizQuestions }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]); // TODO: allow selecting multiple answers
  const [quizRecord, setQuizRecord] = useState<Map<number, QuizRecord>>(
    new Map<number, QuizRecord>()
  );
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const toggleSelectedAnswer = (answerId: string, questionIndex: number) => {
    setSelectedAnswers([answerId]);
    updateQuizRecord(answerId);
  };

  const nextQuestion = () => {
    getQuestionByIndex(currentQuestionIndex + 1);
  };

  const previousQuestion = () => {
    getQuestionByIndex(currentQuestionIndex - 1);
  };

  const submitQuiz = () => {
    setQuizSubmitted(true);
  };

  const getQuestionByIndex = (index: number) => {
    let record = quizRecord.get(index);
    if (record != null) {
      setSelectedAnswers([record.userAnswerId]);
    } else {
      setSelectedAnswers([]);
    }
    setCurrentQuestionIndex(index);
  };

  const updateQuizRecord = (answer: string) => {
    const correctAnswer = quizQuestions[currentQuestionIndex].answers.filter(
      a => a.is_correct === true
    )[0].prompt;
    const userAnswer = quizQuestions[currentQuestionIndex].answers.filter(
      a => a.id === answer
    )[0];

    setQuizRecord(current =>
      current.set(currentQuestionIndex, {
        question: quizQuestions[currentQuestionIndex].prompt,
        correctAnswer: correctAnswer,
        userAnswer: userAnswer.prompt,
        userAnswerId: userAnswer.id,
        correct: correctAnswer === userAnswer.prompt,
        explanation: quizQuestions[currentQuestionIndex].explanation,
      })
    );
  };

  return (
    <>
      <PageHeader>{quizSubmitted ? `Your Results` : quizTitle}</PageHeader>
      {quizSubmitted && (
        <ResultView
          quizTitle={quizTitle}
          quizRecord={Array.from(quizRecord.values())}
        />
      )}
      {!quizSubmitted &&
        quizQuestions[currentQuestionIndex] &&
        quizQuestions[currentQuestionIndex].answers && (
          <span>
            <QuestionHeader
              questionData={quizQuestions[currentQuestionIndex]}
              questionIndex={currentQuestionIndex + 1}
              questionCount={quizQuestions.length}
              animationDelay={30}
            />

            <AnswersTileSection>
              {quizQuestions[currentQuestionIndex].answers.map((answer, i) => (
                <AnswerTileContainerLink
                  key={answer.id}
                  onClick={() => {
                    toggleSelectedAnswer(answer.id, currentQuestionIndex);
                  }}
                >
                  <AnswerTileContainer
                    mark={String.fromCharCode("A".charCodeAt(0) + i)}
                    answerData={answer}
                    selected={selectedAnswers.includes(answer.id)}
                  />
                </AnswerTileContainerLink>
              ))}
            </AnswersTileSection>
            {currentQuestionIndex !== quizQuestions.length - 1 ? (
              <ContentWrapper>
                <NextQuestionBtnContainer>
                  {currentQuestionIndex >= 1 ? (
                    <a
                      tabIndex={0}
                      role="link"
                      onClick={previousQuestion}
                      onKeyDown={previousQuestion}
                    >
                      <PreviousQuestionBtn />
                    </a>
                  ) : (
                    <PreviousQuestionBtn disabled />
                  )}
                  {selectedAnswers.length >= 1 ? (
                    <a
                      tabIndex={0}
                      role="link"
                      onClick={nextQuestion}
                      onKeyDown={nextQuestion}
                    >
                      <NextQuestionBtn />
                    </a>
                  ) : (
                    <NextQuestionBtn disabled />
                  )}
                </NextQuestionBtnContainer>
              </ContentWrapper>
            ) : (
              <ContentWrapper>
                <SubmitQuizBtnContainer>
                  {currentQuestionIndex >= 1 ? (
                    <a
                      tabIndex={0}
                      role="link"
                      onClick={previousQuestion}
                      onKeyDown={previousQuestion}
                    >
                      <PreviousQuestionBtn />
                    </a>
                  ) : (
                    <PreviousQuestionBtn disabled />
                  )}
                  {selectedAnswers.length >= 1 ? (
                    <a
                      tabIndex={0}
                      role="link"
                      onClick={submitQuiz}
                      onKeyDown={submitQuiz}
                    >
                      <SubmitQuizBtn />
                    </a>
                  ) : (
                    <SubmitQuizBtn disabled />
                  )}
                </SubmitQuizBtnContainer>
              </ContentWrapper>
            )}
          </span>
        )}
    </>
  );
}

export async function getStaticPaths() {
  interface Ids {
    id: string;
  }

  const { rows: ids } = await db.query("SELECT id FROM quiz");
  const paths = ids.map(({ id }: Ids) => ({
    params: {
      slug: id,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const {
    rows: [{ title }],
  } = await db.query("SELECT title FROM quiz WHERE id = $1", [slug]);
  const {
    rows: questions,
  } = await db.query("SELECT * FROM question WHERE quiz = $1", [slug]);
  const {
    rows: answers,
  } = await db.query(
    "SELECT id, question, prompt, quiz, is_correct FROM answer WHERE quiz = $1",
    [slug]
  );

  const quizQuestions = shuffle(
    questions.map((question: Question) => ({
      id: question.id,
      prompt: question.prompt,
      answers: shuffle(
        answers.filter((answer: Answer) => answer.question === question.id)
      ),
      explanation: question.explanation,
    }))
  );

  return {
    props: {
      quizTitle: title,
      quizQuestions,
    },
  };
}
