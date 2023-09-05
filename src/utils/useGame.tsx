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
  const timeout = useRef<any>(null);

  const systemMessage: ChatCompletionRequestMessage = {
    role: "system",
    content: `Seninle birlikte bir isim oyunu oynayacağız ve oyunun kuralları aşağıdaki maddelerde verilmiştir.
              Kuralları iyi oku ve anla. Kuralları uygulamak zorundasın. Aksi takdirde oyunu kaybedersin. 12. maddeyi gözden kaçırma.
              1. Oyuna başlayan oyuncu, herhangi bir insan ismi söyler. Örneğin: "Mustafa".
              2. Diğer oyuncu, önceki ismin son harfi ile başlayan yeni bir insan ismi söyler. Örneğin: "Ahmet".
              3. Oyun bu şekilde sırayla devam eder. Her oyuncunun sırası geldiğinde, önceki ismin son harfi ile başlayan yeni bir isim söylemesi gerekmektedir.
              4. Oyuncuların isim bulma süresi, 10 saniye gibi bir zaman dilimiyle sınırlandırılabilir. Eğer bu süre içinde yeni bir isim söylenemezse, oyuncu o turda elenir.
              5. Aynı isim bir tur içinde tekrar söylenemez. Yani, oynanan turdaki isimler farklı olmalıdır.
              6. Oyun, oyunculardan biri hata yapana veya isim bulamayana kadar devam eder.
              7. Hata yapan veya isim bulamayan oyuncu oyunu kaybeder ve diğer oyuncu oyunun galibi olur.
              8. Oyun Türkçe karakterli harflerle oynanacaktır.
              9. Oyunda sohbet yoktur. Sadece isim yazılacaktır.
                  Örneğin:
                  - Nazlı
                  - Işıl
                  - Leyla
              10. Oyuna kullanıcı başlıyor ve sadece isim yazarak başlıyor. 
              11. Anladığını belirtmeni veya herhangi bir cümle kurman yasak.
              12. Başladım, Anladım, Hadi Başlayalım, Başlıyorum, Kuralları anladım, Hazırım gibi başlangıç cümleleri kurmak yasak.
              13. Eğer isim bulamazsan yeni bir tur başlatma. 
              14. İlk turda ilk ismi kullanıcı vermek zorunda.
              15. İnsan ismi dışındaki isimler (Şehir ismi, hayvan ismi, eşya ismi vb. gibi) kabul edilemez.
              16. İsmi yazdıktan sonra sonuna herhangi bir noktalama işareti koyma.
              17. Sadece ismi ve sıranı bekle.
              18. Sana isim verildikten sonra sadece cevap ver.`,
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
          if (timer == 0) {
            clearInterval(timeout.current);
            gameOverControl(messages, "system", true);
          }
          return timer - 1;
        });
      }, 1000);
    } else {
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

      setScore(getScore(newMessages));
      return newMessages;
    });
    setIsTurn(() => "assistant");
    setTimer(10);
  };

  const systemAnswerTurn = async (content: string) => {
    let reply = {};
    if (playingWith === "chatGpt") {
      reply = await chatGptAnswer(messages);
    } else {
      reply = computerAnswer(content);
    }

    setMessages((oldMessages: any[]) => {
      if(gameOverControl([...oldMessages], "user")) return [...oldMessages];
      return [...oldMessages, reply];
    });
    setIsTurn(() => "user");
  };

  const gameOverControl = (messages: any[], winner: string, isWin = false) => {
    if (checkGameOver(messages) || isWin || isDuplicateAnswer(messages)) {
      setWinner(winner);
      setGameOver(true);
      return true;
    }
  };

  const newName = async (content: string) => {
    setIsLoadingAnswer(true);
    try {
      await userAnswerTurn(content);
      await systemAnswerTurn(content);
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
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => {
  return useContext(GameContext) as ContextProps;
};
