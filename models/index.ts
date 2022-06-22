import type { Quiz }     from "./ChinguQuiz/Quiz";
import type { Question } from "./ChinguQuiz/Question";
import type { Answer } from "./ChinguQuiz/Answer";
import type { QuizRecord } from "./ChinguQuiz/QuizRecord";

import type { SubjectAndTopic } from './UI/Quizzes'

export declare namespace ChinguQuiz {
  export { Quiz, Question, Answer, QuizRecord };
}
export declare namespace UI {
  export namespace Quizzes {
    export { SubjectAndTopic }
  }
}
