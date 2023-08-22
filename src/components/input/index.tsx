interface Props {
  transcript: string;
}
export default function Input(props: Props) {

  return (
    <div className="relative mt-2 rounded-md shadow-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <span className="text-gray-500 sm:text-sm">A</span>
      </div>
      <input
        type="text"
        name="name"
        id="name"
        className="lowercase block w-full rounded-md border-0 py-1.5 pl-6 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="enter a name that starts with the letter...."
        value={props.transcript}
      />
    </div>
  );
}
