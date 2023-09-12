![](https://i.hizliresim.com/7u9d3up.png)

# Son Harf

Son Harf is a word game that the user plays either against ChatGpt or against the computer, based on deriving the name from the last letter of the name spoken by the opponent.

## 💻 Live Demo

[Live Demo](https://main--idyllic-churros-f27942.netlify.app/)

## 📖 Prerequisites

- In order to run the project from a container we need `node>=18.17.1`, `npm>=9.8.1` installed on our development machines
- In order to use the microphone in the Last Letter application, you must run it in browsers supported by Google API. For example; Chrome.

## 🖥Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## 💨 Technologies

The using technologies were used in the Son Harf;

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [OpenAI](https://openai.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Typescript](https://www.typescriptlang.org/)
- [Tailwind.css](https://tailwindcss.com/)
- [Axios](https://axios-http.com/docs/intro)
- [react-speech-recognition](https://www.npmjs.com/package/react-speech-recognition?activeTab=readme)
- [regenerator-runtime](hhttps://www.npmjs.com/package/regenerator-runtime)

## 🎭 Contributing

We welcome any and all contributions! Here are some ways you can get started:

1. Report bugs: If you encounter any bugs, please let us know. Open up an issue and let us know the problem.
2. Contribute code: If you are a developer and want to contribute, follow the instructions below to get started!
3. Suggestions: If you don't want to code but have some awesome ideas, open up an issue explaining some updates or imporvements you would like to see!
4. Documentation: If you see the need for some additional documentation, feel free to add some!

## ✨Instructions

1. Fork this repository
2. Clone the forked repository
3. Add your contributions (code or documentation)
4. Commit and push
5. Wait for pull request to be merged

### 🔑 Api Key

If you want to play with ChatGPT when you run the Son Harf application locally, you must add OPENAI_API_KEY to your .env file. You should visit [OpenAI API](https://openai.com/product) for details.

### 💾 Database

The list of names used in this project was taken from Alp Can Aydın's repositories with permission.
That repository template lives at [name list](https://github.com/alpcanaydin/sonharf/blob/master/src/db/names.json).

### 📝 Markdown Support

This project leverages [Dillenger](https://dillinger.io/) for a delightful experience in documenting your Open Source goals. The editor supports markdown features including heading levels, bulleted lists, text formatting, code snippets, and emojis!

## ⭕ Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## ⚖️ LICENSE

MIT © [license](https://github.com/zehraikizler/son-harf/blob/main/LICENSE)
