import React from "react";
import { Heading4 } from "../shared/styles";
import { SubmitQuizBtnStyled, DisabledSubmitQuizBtnStyled } from "./styles";

interface SubmitQuizBtnProps {
  disabled?: Boolean;
  text?: String;
}

export default function SubmitQuizBtn({ disabled, text }: SubmitQuizBtnProps) {
  if (!text) {
    text = "SUBMIT";
  }
  return disabled ? (
    <DisabledSubmitQuizBtnStyled>
      <Heading4>{text}</Heading4>
    </DisabledSubmitQuizBtnStyled>
  ) : (
    <SubmitQuizBtnStyled>
      <Heading4>{text}</Heading4>
    </SubmitQuizBtnStyled>
  );
}
