import Link from "next/link";
import { QuizRecord } from "~/models/ChinguQuiz/QuizRecord";
import { Heading4, TextBodyBold, TextBodySmallBold } from "../shared/styles";
import {
  ResultPageContainer,
  ResultTitleContainer,
  ResultTileContainer,
  ResultTile,
  CodeBlock,
  TileNumber,
  SubmitQuizBtnStyled,
} from "./styles";
import ScoreGraph from "./ScoreGraph";
import Alert from "@mui/material/Alert";
import { useContext } from "react";
import { QuizContext } from "../../contexts/quiz-context";
import humanizeDuration from "humanize-duration";

export default function ResultView({
  quizTitle,
  quizRecord,
}: {
  quizTitle: string;
  quizRecord: QuizRecord[];
}) {
  const { timer } = useContext(QuizContext);
  const answeredQuizRecord = quizRecord.filter(r => r != null);
  const percentage =
    Math.round(
      (answeredQuizRecord.filter(r => r.correct).length * 100) /
        quizRecord.length
    ) || 0;
  const totalQs = quizRecord.length;

  return (
    <ResultPageContainer>
      <div>
        <p
          style={{
            textAlign: "center",
            paddingTop: "30px",
            fontWeight: "bold",
          }}
        >
          Total Time: {humanizeDuration(timer * 1000)}
        </p>
        <ScoreGraph percentage={percentage} />
      </div>

      <div>
        <ResultTitleContainer>
          <Heading4>{quizTitle}</Heading4>
        </ResultTitleContainer>

        <ResultTileContainer>
          {quizRecord.length - answeredQuizRecord.length ? (
            <Alert variant="outlined" severity="warning">
              You skip {quizRecord.length - answeredQuizRecord.length} questions
              in the test.
            </Alert>
          ) : null}
          {answeredQuizRecord.map((record, i) => (
            <ResultTile
              correct={record.correct}
              animationDelay={`${100 + i * 50}ms`}
              key={`${quizTitle}-${i}`}
            >
              <div>
                <TextBodyBold>
                  Question:{" "}
                  <TileNumber>
                    {i + 1}/{totalQs}
                  </TileNumber>
                </TextBodyBold>
                <CodeBlock>{record.question}</CodeBlock>
                <TextBodySmallBold>Correct Answer:</TextBodySmallBold>
                <CodeBlock>{record.correctAnswer}</CodeBlock>
                <TextBodySmallBold>Your Answer:</TextBodySmallBold>
                <CodeBlock>{record.userAnswer}</CodeBlock>
                <TextBodySmallBold>Explanation:</TextBodySmallBold>
                <CodeBlock>{record.explanation}</CodeBlock>
              </div>
            </ResultTile>
          ))}
        </ResultTileContainer>

        <ResultTitleContainer>
          <Link href="/quizzes">
            <SubmitQuizBtnStyled>
              <Heading4>{"Try Another"}</Heading4>
            </SubmitQuizBtnStyled>
          </Link>
        </ResultTitleContainer>
      </div>
    </ResultPageContainer>
  );
}
