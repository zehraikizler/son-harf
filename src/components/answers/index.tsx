"use client";
import React from "react";
import { useGame } from "@/utils/useGame";

const Answers = () => {
  const { messages, isLoadingAnswer, isGameOn } = useGame();
  return (
    <div>
      {isGameOn ? (
        <div>
          {messages?.map((message, i) => {
            const isUser = message.role === "user";
            if (message.role === "system") return null;
            return (
              <div
                id={`message-${i}`}
                className={`flex mb-4 fade-up ${
                  isUser ? "justify-end" : "justify-start"
                } ${i === 1 ? "max-w-md" : ""}`}
                key={i}
              >
                {!isUser && (
                  <img
                    src="https://as2.ftcdn.net/v2/jpg/01/85/13/47/1000_F_185134767_3zI4z0vWkI6ZBzCgbVC6tG93OidfDqO7.jpg"
                    className="w-9 h-9 rounded-full"
                    alt="avatar"
                  />
                )}
                <div
                  style={{ maxWidth: "calc(100% - 45px)" }}
                  className={`group relative rounded-lg capitalize ${
                    isUser
                      ? "bg-purple-200 px-3 py-2 rounded-3xl rounded-br-none mr-2"
                      : "bg-pink-200 px-3 py-2 rounded-3xl rounded-bl-none ml-2"
                  }`}
                >
                  {message.content.trim()}
                </div>
                {isUser && (
                  <img
                    src="https://as2.ftcdn.net/v2/jpg/01/12/82/29/1000_F_112822904_NthS7hI8qBDf1p6h16OuffGbVF9Dnww1.jpg"
                    className="w-9 h-9 rounded-full cursor-pointer"
                    alt="avatar"
                  />
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex mb-4 fade-up justify-start">
          <img
            src="https://as2.ftcdn.net/v2/jpg/01/85/13/47/1000_F_185134767_3zI4z0vWkI6ZBzCgbVC6tG93OidfDqO7.jpg"
            className="w-9 h-9 rounded-full"
            alt="avatar"
          />

          <div
            style={{ maxWidth: "calc(100% - 45px)" }}
            className="group relative bg-pink-200 px-3 py-2 rounded-3xl rounded-bl-none ml-2"
          >
            Oyuna başlamak için rakibini seç
          </div>
        </div>
      )}

      {isLoadingAnswer && (
        <div className="flex justify-start mb-4">
          <img
            src="https://as2.ftcdn.net/v2/jpg/01/85/13/47/1000_F_185134767_3zI4z0vWkI6ZBzCgbVC6tG93OidfDqO7.jpg"
            className="w-9 h-9 rounded-full"
            alt="avatar"
          />
          <div className="loader ml-2 p-2.5 px-4 bg-pink-200 rounded-tl-none rounded-full space-x-1.5 flex justify-between items-center relative">
            <span className="block w-3 h-3 rounded-full"></span>
            <span className="block w-3 h-3 rounded-full"></span>
            <span className="block w-3 h-3 rounded-full"></span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Answers;
