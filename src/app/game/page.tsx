"use client"
import React from 'react';
import "regenerator-runtime/runtime";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Input from '@/components/input';

const Dictaphone = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <Input transcript={transcript} />
      <div className='flex gap-3 mt-6 mb-3'>
      <button onClick={SpeechRecognition.startListening} className='bg-blue-600 rounded-lg px-3 text-white'>Start</button>
      <button onClick={SpeechRecognition.stopListening} className='bg-red-600 rounded-lg px-3 text-white'>Stop</button>
      <button onClick={resetTranscript} className='bg-green-600 rounded-lg px-3 text-white'>Reset</button>
      </div>
      <p className='text-sm font-semibold'>Microphone: {listening ? 'on' : 'off'}</p>
    </div>
  );
};
export default Dictaphone;