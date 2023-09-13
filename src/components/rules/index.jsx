import React from "react";
import { useState, Dispatch, SetStateAction } from "react";
import { AiOutlineClose } from "react-icons/ai";

const Rules = ({ showRules, setShowRules }) => {
  return (
    <div
      className={`absolute w-full h-full backdrop-blur-sm bg-black/30 top-0 justify-center items-center ${
        showRules ? "flex" : "hidden"
      } `}
    >
      <div className="w-[80%] lg:w-[50%] h-[80%] bg-white p-4 overflow-y-scroll no-scrollbar relative">
        <button
          className="absolute right-3"
          onClick={() => setShowRules(false)}
        >
          <AiOutlineClose size={22} />
        </button>
        <h1 className="text-center mt-3 mb-5 bg-gradient-to-l from-indigo-700 via-purple-700 to-pink-700 bg-clip-text text-transparent text-3xl font-extrabold">
          KURALLAR
        </h1>
        <ol className="text-black text-md lg:text-lg pe-1 lg:pe-2 ps-4 lg:ps-8 list-decimal">
          <li>Oyuna başlayan oyuncu, herhangi bir insan isim söyler.</li>
          <li>
            Diğer oyuncu, önceki ismin son harfi ile başlayan yeni bir insan
            ismi söyler.
          </li>
          <li>
            Oyun bu şekilde sırayla devam eder. Her oyuncunun sırası geldiğinde,
            önceki ismin son harfi ile başlayan yeni bir isim söylemesi
            gerekmektedir.
          </li>
          <li>
            Oyuncuların isim bulma süresi, 10 saniye ile sınırlıdır. Eğer bu
            süre içinde yeni bir isim söylenmezse, oyuncu kaybeder.
          </li>
          <li>
            Aynı isim bir tur içinde tekrar söylenemez. Yani, oynanan turdaki
            isimler farklı olmalıdır.
          </li>
          <li>
            Oyun, oyunculardan biri hata yapana kadar veya isim bulamayana kadar
            devam eder.
          </li>
          <li>İlk turda ilk ismi sen vermek zorundasın.</li>
          <li>
            İnsan ismi dışındaki isimler (Şehir ismi, hayvan ismi, eşya ismi vb.
            gibi) kabul edilemez.
          </li>
          <li>
            Oyunda sohbet yoktur. Sadece isim yazılacaktır. Örneğin:
            <ul className="list-disc ps-4">
              <li>Zehra</li>
              <li>Ayşe</li>
              <li>Elif</li>
              <li>Furkan</li>
            </ul>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Rules;
