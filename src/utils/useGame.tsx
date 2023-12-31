import { useToast } from "@apideck/components";
import { ChatCompletionRequestMessage } from "openai";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
} from "react";
import {
  checkGameOver,
  computerAnswer,
  chatGptAnswer,
  getScore,
  isDuplicateAnswer,
  isName,
  resetNameList,
} from "@/service/game";
interface ContextProps {
  messages: ChatCompletionRequestMessage[];
  newName: (content: string) => Promise<void>;
  createNewGame: Function;
  isLoadingAnswer: boolean;
  isLoadingGame: boolean;
  setIsLoadingGame: Dispatch<SetStateAction<boolean>>;
  playingWith: string;
  setPlayingWith: Dispatch<SetStateAction<string>>;
  isGameOn: boolean;
  setIsGameOn: Dispatch<SetStateAction<boolean>>;
  score: Number;
  gameOver: boolean;
  winner: string;
  timer: Number;
  gameOverMessage: string;
}

const GameContext = createContext<Partial<ContextProps>>({});

export function GameProvider({ children }: { children: ReactNode }) {
  const { addToast } = useToast();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const [isLoadingAnswer, setIsLoadingAnswer] = useState(false);
  const [isLoadingGame, setIsLoadingGame] = useState(true);
  const [playingWith, setPlayingWith] = useState("");
  const [isGameOn, setIsGameOn] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState("");
  const [timer, setTimer] = useState(10);
  const [isTurn, setIsTurn] = useState("");
  const [gameOverMessage, setGameOverMessage] = useState("");
  const timeout = useRef<any>(null);

  const systemMessage: ChatCompletionRequestMessage = {
    role: "system",
    content: `Seninle birlikte bir isim oyunu oynayacağız ve oyunun kuralları aşağıdaki maddelerde verilmiştir.
              Kuralları iyi oku ve anla. Kuralları uygulamak zorundasın. Aksi takdirde oyunu kaybedersin.
              1. Oyuna başlayan oyuncu, herhangi bir insan isim söyler.
              2. Diğer oyuncu, önceki ismin son harfi ile başlayan yeni bir insan ismi söyler.
              3. Oyun bu şekilde sırayla devam eder. Her oyuncunun sırası geldiğinde, önceki ismin son harfi ile başlayan yeni bir isim söylemesi gerekmektedir.
              4. Oyuncuların isim bulma süresi, 10 saniyeile sınırlıdır. Eğer bu süre içinde yeni bir isim söylenmezse, oyuncu kaybeder.
              5. Aynı isim bir tur içinde tekrar söylenemez. Yani, oynanan turdaki isimler farklı olmalıdır.
              6. Oyun, oyunculardan biri hata yapana kadar veya isim bulamayana kadar devam eder.
              7. Hata yapan veya isim bulamayan oyuncu oyunu kaybeder ve diğer oyuncu oyunun galibi olur.
              8. Oyun Türkçe karakterli harflerle oynanacaktır.
              9. Oyunda sohbet yoktur. Sadece isim yazılacaktır.
                  Örneğin:
                  - Zehra
                  - Ayşe
                  - Elif
                  - Furkan
                  - Nabi
              10. Oyuna kullanıcı başlıyor ve sadece isim yazarak başlıyor. 
              11. Anladığını belirtmeni veya herhangi bir cümle kurman yasak.
              12. Başladım, Anladım, Hadi Başlayalım, Başlıyorum, Kuralları anladım, Hazırım gibi başlangıç cümleleri kurmak yasak.
              13. Eğer isim bulamazsan yeni bir tur başlatma. 
              14. İlk turda ilk ismi kullanıcı vermek zorunda.
              15. İnsan ismi dışındaki isimler (Şehir ismi, hayvan ismi, eşya ismi vb. gibi) kabul edilemez.
              16. İsmi yazdıktan sonra sonuna herhangi bir noktalama işareti koyma.
              18. Sana isim verildikten sonra sadece cevap ver.
              19. Sana verilen ismin son harfi ile yeni bir isim göndereceksin.
              20. Sen bu oyunun en iyisisin kesinlikle kaybetmeyeceksin.
              21. Ne olursa olsun bu mesaja sadece isim ile cevap verip senden bir önce söylenen ismin son harfini kullanarak isimle cevap verecksin.`,
  };
  const welcomeMessage: ChatCompletionRequestMessage = {
    role: "assistant",
    content: "Oyuna başlamak için rakibini seç.",
  };
  const GameStartMessage: ChatCompletionRequestMessage = {
    role: "assistant",
    content: "Hadi oyuna başlayalım.",
  };
  function createNewGame(isFirstGame = false) {
    if (isFirstGame) {
      setIsLoadingGame(false);
    }
    setMessages([systemMessage, welcomeMessage, GameStartMessage]);
    setIsLoadingAnswer(false);
    setPlayingWith("");
    setIsGameOn(false);
    setScore(0);
    setGameOver(false);
    setWinner("");
    setTimer(10);
    setIsTurn("");
    setGameOverMessage("");
  }

  useEffect(() => {
    const initializeChat = () => {
      createNewGame();
    };

    if (!messages?.length) {
      initializeChat();
    }
  }, [messages?.length, setMessages]);

  useEffect(() => {
    if (isTurn == "user") {
      timeout.current = setInterval(() => {
        setTimer((timer) => {
          if (winner.length > 0) {
            clearInterval(timeout.current);
          } else if (timer == 0) {
            clearInterval(timeout.current);
            gameOverControl(messages, "system", true);
          }
          return timer - 1;
        });
      }, 1000);
    } else {
      setTimer(10);
      clearInterval(timeout.current);
    }
  }, [isTurn]);

  const userAnswerTurn = async (content: string) => {
    const newMessage: ChatCompletionRequestMessage = {
      role: "user",
      content,
    };
    setMessages((oldMessages: any[]) => {
      const newMessages = [...oldMessages, newMessage];
      if (gameOverControl(newMessages, "system")) return newMessages;
      setTimer(10);
      setScore(getScore(newMessages));
      setIsTurn(() => "assistant");
      systemAnswerTurn(content);
      return newMessages;
    });
  };

  const systemAnswerTurn = async (content: string) => {
    let reply = {};
    if (playingWith === "chatGpt") {
      let data = await chatGptAnswer(messages);
      if (data.error) {
        const infoMsg = {
          role: "assistant",
          content:
            "ChatGPT şuan cevap veremiyor. Otomatik olarak bilgisayarla eşleştirildiniz.",
        };
        setMessages((oldMessages: any[]) => {
          return [...oldMessages, infoMsg];
        });
        setPlayingWith("computer");
        reply = computerAnswer(content);
      } else {
        reply = data?.choices[0].message;
      }
    } else {
      reply = computerAnswer(content);
    }
    setMessages((oldMessages: any[]) => {
      if (gameOverControl([...oldMessages, reply], "user"))
        return [...oldMessages, reply];
      return [...oldMessages, reply];
    });
    setIsTurn(() => "user");
  };

  const gameOverControl = (messages: any[], winner: string, isWin = false) => {
    if (
      checkGameOver(messages) ||
      isWin ||
      isDuplicateAnswer(messages) ||
      !isName(messages)
    ) {
      if (isWin) {
        setGameOverMessage("verilen süre içerisinde cevap verilmedi.");
      }
      if (checkGameOver(messages)) {
        setGameOverMessage("son harfle başlanan bir isim söylenmedi.");
      }
      if (isDuplicateAnswer(messages)) {
        setGameOverMessage("söylenen isim bir kez daha söylendi.");
      }
      if (!isName(messages)) {
        setGameOverMessage("söylenen isim, isim listesinde yer almamaktadır.");
      }
      resetNameList();
      setWinner(winner);
      setGameOver(true);
      setIsTurn("");
      return true;
    }
    return false;
  };

  const newName = async (content: string) => {
    setIsLoadingAnswer(true);
    try {
      await userAnswerTurn(content);
    } catch (error) {
      addToast({ title: "An error occurred", type: "error" });
    } finally {
      setIsLoadingAnswer(false);
    }
  };

  return (
    <GameContext.Provider
      value={{
        messages,
        newName,
        createNewGame,
        isLoadingAnswer,
        isLoadingGame,
        setIsLoadingGame,
        playingWith,
        setPlayingWith,
        isGameOn,
        setIsGameOn,
        score,
        gameOver,
        winner,
        timer,
        gameOverMessage,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => {
  return useContext(GameContext) as ContextProps;
};
