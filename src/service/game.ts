import db from "@/db/names.json";
import { sendMessage } from "@/utils/sendMessage";
var namesList = db.slice();
export async function chatGptAnswer(newMessages: any[]) {
  const response = await sendMessage(newMessages);
  const { data } = await response?.json();
  return data?.choices[0].message;
}

export function computerAnswer(content: string) {
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
      ].toLowerCase() != secondGamerAnswer.content[0].toLowerCase()
    );
  }
}

export function isDuplicateAnswer(messages: any) {
  if (messages.length > 3) {
    var contentArr = messages.map(function (item: any) {
      return item.content;
    });
    var isDuplicate = contentArr.some(function (item: any, index: any) {
      return contentArr.indexOf(item) != index;
    });
    return isDuplicate;
  }

  return false;
}

export function isName(messages: any) {
  if (messages.length > 3) {
    var contentArr = messages.map(function (item: any) {
      return item.content;
    });
    const lastName = contentArr[contentArr.length - 1].toLowerCase();
    var isName = db.includes(lastName);
    return isName;
  }

  return false;
}

export function getScore(messages: any) {
  return messages.filter((el: any) => el.role === "user").length;
}
