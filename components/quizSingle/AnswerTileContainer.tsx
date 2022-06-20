import React from "react";
import {
  AnswerTileContainerStyled,
  TrueAnswerTileContainerStyled,
} from "./styles";
import AnswerTileMark from "./AnswerTileMark";
import AnswerTileText from "./AnswerTileText";
import type { ChinguQuiz } from "../../models";

interface AnswerTileContainerProps {
  mark?: string;
  answerData?: ChinguQuiz.Answer;
  selected?: boolean;
}
export function AnswerTileContainer({
  mark,
  answerData,
  selected,
}: AnswerTileContainerProps) {
  return mark && answerData && answerData.prompt ? (
    <AnswerTileContainerStyled selected={selected}>
      <AnswerTileMark mark={mark} />
      <AnswerTileText text={answerData.prompt} />
    </AnswerTileContainerStyled>
  ) : null;
}

export function TrueAnswerTileContainer({
  mark,
  answerData,
  selected,
}: AnswerTileContainerProps) {
  return mark && answerData && answerData.prompt && answerData.is_correct ? (
    <AnswerTileContainerStyled selected={true}>
      <AnswerTileMark mark={mark} />
      <AnswerTileText text={answerData.prompt} />
    </AnswerTileContainerStyled>
  ) : (
    <TrueAnswerTileContainerStyled selected={selected}>
      <AnswerTileMark mark={mark} />
      <AnswerTileText text={answerData.prompt} />
    </TrueAnswerTileContainerStyled>
  );
}
