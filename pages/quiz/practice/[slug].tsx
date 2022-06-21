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
  SubmitQuizBtnStyled,
} from "~/components/quizSingle/styles";
import QuestionHeader from "~/components/quizSingle/QuestionHeader";
import NextQuestionBtn from "~/components/quizSingle/NextQuestionBtn";
import {
  AnswerTileContainer,
  TrueAnswerTileContainer,
} from "~/components/quizSingle/AnswerTileContainer";
import { Heading4 } from "~/components/shared/styles";
import db from "~/db";
import { Question } from "~/models/ChinguQuiz/Question";
import { Answer } from "~/models/ChinguQuiz/Answer";
import Link from "next/link";
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import shuffle from "shuffle-array";

interface QuizProps {
  quizTitle: string;
  quizQuestions: Question[];
}

export default function Quiz({ quizTitle, quizQuestions }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]); // TODO: allow selecting multiple answers
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const toggleSelectedAnswer = (answerId: string, questionIndex: number) => {
    setSelectedAnswers([answerId]);
  };

  const nextQuestion = () => {
    setSelectedAnswers([]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const submitQuiz = () => {
    setQuizSubmitted(true);
  };

  return (
    <>
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
              {quizQuestions[currentQuestionIndex].answers.map((answer, i) =>
                selectedAnswers.length == 0 ? (
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
                ) : (
                  <TrueAnswerTileContainer
                    mark={String.fromCharCode("A".charCodeAt(0) + i)}
                    answerData={answer}
                    selected={selectedAnswers.includes(answer.id)}
                  />
                )
              )}
            </AnswersTileSection>
            {selectedAnswers.length >= 1 && !quizSubmitted ? (
              <Container maxWidth="md">
                <Alert
                  severity="info"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {quizQuestions[currentQuestionIndex].explanation}
                </Alert>
              </Container>
            ) : null}
            {currentQuestionIndex !== quizQuestions.length - 1 ? (
              <ContentWrapper>
                <NextQuestionBtnContainer>
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
                  {selectedAnswers.length >= 1 ? (
                    <a
                      tabIndex={0}
                      role="link"
                      onClick={submitQuiz}
                      onKeyDown={submitQuiz}
                    >
                      <div>
                        <Link href="/quizzes">
                          <SubmitQuizBtnStyled>
                            <Heading4>{"Try Another"}</Heading4>
                          </SubmitQuizBtnStyled>
                        </Link>
                      </div>
                    </a>
                  ) : null}
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
