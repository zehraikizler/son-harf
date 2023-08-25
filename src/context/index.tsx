import {ReactNode, createContext, useState, useContext} from "react";

interface AnswerItem {
  sentBy: string; name: string
}

interface AnswersContextValue {
  answers: Array<AnswerItem> | null;
  setAnswers: React.Dispatch<React.SetStateAction<Array<AnswerItem> | null>>;
}

const AnswersContext = createContext<AnswersContextValue 
| undefined>(undefined);

type Props = {
  children: ReactNode;
};

export const AnswersProvider = ({children}: Props) => {
  const [answers, setAnswers] = useState<Array<AnswerItem> | null>([]);
  return (
    <AnswersContext.Provider value={{answers, setAnswers}}>
      {children}
    </AnswersContext.Provider>
  );
};

export const useAnswersContext = () => {
  const answersContext = useContext(AnswersContext);
  return answersContext;
};