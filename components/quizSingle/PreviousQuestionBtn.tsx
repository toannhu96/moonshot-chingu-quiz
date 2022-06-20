import React from "react";
import { Heading4 } from "../shared/styles";
import { NextQuestionBtnStyled, DisabledNextQuestionBtnStyled } from "./styles";

interface PreviousQuestionBtnProps {
  disabled?: Boolean;
}

export default function PreviousQuestionBtn({ disabled }: PreviousQuestionBtnProps) {
  return disabled ? (
    <DisabledNextQuestionBtnStyled>
      <Heading4>PREVIOUS</Heading4>
    </DisabledNextQuestionBtnStyled>
  ) : (
    <NextQuestionBtnStyled>
      <Heading4>PREVIOUS</Heading4>
    </NextQuestionBtnStyled>
  );
}
