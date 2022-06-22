import React from "react";
import { Heading3, TextBodyBold } from "../shared/styles";
import {
  QuestionHeaderContainer,
  QuestionProgressBar,
  QuestionProgressBarFiller,
  QuestionProgressBarText,
  QuestionStepDotContainer,
  QuestionStepDot,
} from "./styles";
import type { ChinguQuiz } from "../../models";

interface QuestionHeaderProps {
  questionData: ChinguQuiz.Question;
  questionIndex: number;
  questionCount: number;
  quizRecord: Map<number, ChinguQuiz.QuizRecord>;
  animationDelay: number;
  getQuestionByIndex: Function;
}
export default function QuestionHeader({
  questionData,
  questionIndex, // question index start from 1 not 0
  questionCount,
  quizRecord,
  getQuestionByIndex,
  animationDelay,
}: QuestionHeaderProps) {
  return (
    <QuestionHeaderContainer animationDelay={animationDelay}>
      <QuestionProgressBarText>
        <TextBodyBold>
          {`Question ${questionIndex} / ${questionCount}`}
        </TextBodyBold>
      </QuestionProgressBarText>
      <QuestionProgressBar>
        <QuestionProgressBarFiller
          completion={(questionIndex / questionCount) * 100}
        />
      </QuestionProgressBar>
      <QuestionStepDotContainer>
        {quizRecord != null &&
          [...Array(questionCount).keys()].map(i => {
            let status = "inactive";
            if (i + 1 == questionIndex) {
              status = "active";
            } else if (quizRecord.has(i)) {
              status = "finish";
            }
            return (
              <QuestionStepDot
                status={status}
                onClick={e =>
                  getQuestionByIndex(parseInt(e.target.innerHTML) - 1)
                }
              >
                {i + 1}
              </QuestionStepDot>
            );
          })}
      </QuestionStepDotContainer>
      <br />
      <Heading3>{questionData.prompt}</Heading3>
    </QuestionHeaderContainer>
  );
}
