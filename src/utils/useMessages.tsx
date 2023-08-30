import { useToast } from "@apideck/components";
import { ChatCompletionRequestMessage } from "openai";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { sendMessage } from "./sendMessage";

interface ContextProps {
  messages: ChatCompletionRequestMessage[];
  addMessage: (content: string) => Promise<void>;
  isLoadingAnswer: boolean;
}

const ChatsContext = createContext<Partial<ContextProps>>({});

export function MessagesProvider({ children }: { children: ReactNode }) {
  const { addToast } = useToast();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const [isLoadingAnswer, setIsLoadingAnswer] = useState(false);

  useEffect(() => {
    const initializeChat = () => {
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
                  16. Sadece ismi ve sıranı bekle.`,
      };
      const welcomeMessage: ChatCompletionRequestMessage = {
        role: "assistant",
        content: "Hadi oyuna başlayalım.",
      };
      setMessages([systemMessage, welcomeMessage]);
    };

    if (!messages?.length) {
      initializeChat();
    }
  }, [messages?.length, setMessages]);

  const addMessage = async (content: string) => {
    setIsLoadingAnswer(true);
    try {
      const newMessage: ChatCompletionRequestMessage = {
        role: "user",
        content,
      };
      const newMessages = [...messages, newMessage];
      setMessages(newMessages);

      const response = await sendMessage(newMessages);
      const { data } = await response?.json();
      const reply = data?.choices[0].message;
      console.log(data);

      await setMessages([...newMessages, reply]);
    } catch (error) {
      addToast({ title: "An error occurred", type: "error" });
    } finally {
      setIsLoadingAnswer(false);
    }
  };

  return (
    <ChatsContext.Provider value={{ messages, addMessage, isLoadingAnswer }}>
      {children}
    </ChatsContext.Provider>
  );
}

export const useMessages = () => {
  return useContext(ChatsContext) as ContextProps;
};
