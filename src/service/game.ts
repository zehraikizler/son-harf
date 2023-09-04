import db from "@/db/names.json";
import { sendMessage } from "@/utils/sendMessage";

export async function chatGptAnswer(newMessages: any[]) {
  const response = await sendMessage(newMessages);
  const { data } = await response?.json();
  return data?.choices[0].message;
}

export function computerAnswer(content: string) {
  let namesList: string[] = db;
  let reply = namesList.filter(
    (element: string) =>
      element[0].toUpperCase() === content[content.length - 1].toUpperCase()
  );
  const index = namesList.indexOf(reply[0]);
  if (index > -1) {
    namesList.splice(index, 1);
  }
  if (reply.length < 1) return { role: "assistant", content: "no message" };
  return { role: "assistant", content: reply[0] };
}

export function checkGameOver(messages: any) {
  let firstGamerAnswer;
  let secondGamerAnswer;
  if (messages.length > 4) {
    secondGamerAnswer = messages[messages.length - 1];
    firstGamerAnswer = messages[messages.length - 2];
    return (
      firstGamerAnswer.content[
        firstGamerAnswer.content.length - 1
      ].toUpperCase() != secondGamerAnswer.content[0].toUpperCase()
    );
  }
}

export function getScore(messages: any) {
  return messages.filter((el: any) => el.role === "user").length;
}
