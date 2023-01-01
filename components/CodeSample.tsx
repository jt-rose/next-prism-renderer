// import React from "react";
// import styled from "styled-components";
// import Highlight, { defaultProps } from "prism-react-renderer";
// import duotone from "prism-react-renderer/themes/duotoneDark/index.cjs.js";
// import palenight from "prism-react-renderer/themes/palenight/index.cjs.js";

// const Pre = styled.pre`
//   text-align: left;
//   margin: 1em 0;
//   padding: 0.5em;
//   overflow: scroll;
//   border-radius: 5px;

//   & .token-line {
//     line-height: 1.3em;
//     height: 1.3em;
//   }
// `;

// const exampleCode = `
// (function someDemo() {
//   var test = "Hello World!";
//   console.log(test);
// })();

// return () => <App />;
// `.trim();

// export const Basic = () => {
//   const [theme, setTheme] = React.useState(true);

//   return (
//     <div onClick={() => setTheme(!theme)}>
//       <Highlight
//         {...defaultProps}
//         theme={theme ? duotone : palenight}
//         code={exampleCode}
//         language="jsx"
//       >
//         {({ className, style, tokens, getLineProps, getTokenProps }) => (
//           <Pre className={className} style={style}>
//             {tokens.map((line, i) => (
//               <div key={"kl" + i} {...getLineProps({ line, key: i })}>
//                 {line.map((token, key) => (
//                   <span key={"lo" + key} {...getTokenProps({ token, key })} />
//                 ))}
//               </div>
//             ))}
//           </Pre>
//         )}
//       </Highlight>
//     </div>
//   );
// };
import { useState, useEffect } from "react";

import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";

/* --------------------------- import Prism themes -------------------------- */
import coldark from "react-syntax-highlighter/dist/cjs/styles/prism/coldark-dark";
import dracula from "react-syntax-highlighter/dist/cjs/styles/prism/dracula";
import vsDark from "react-syntax-highlighter/dist/cjs/styles/prism/vs-dark";
import materialDark from "react-syntax-highlighter/dist/cjs/styles/prism/material-dark";
import a11yDark from "react-syntax-highlighter/dist/cjs/styles/prism/a11y-dark";
import nightOwl from "react-syntax-highlighter/dist/cjs/styles/prism/night-owl";
import nord from "react-syntax-highlighter/dist/cjs/styles/prism/nord";
import okaidia from "react-syntax-highlighter/dist/cjs/styles/prism/okaidia";
import vscDarkPlus from "react-syntax-highlighter/dist/cjs/styles/prism/vsc-dark-plus";
import pojoaque from "react-syntax-highlighter/dist/cjs/styles/prism/pojoaque";
import solarizedLight from "react-syntax-highlighter/dist/cjs/styles/prism/solarizedlight";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import tomorrow from "react-syntax-highlighter/dist/cjs/styles/prism/tomorrow";

const themes = {
  coldark,
  dracula,
  vsDark,
  materialDark,
  a11yDark,
  nightOwl,
  nord,
  okaidia,
  vscDarkPlus,
  pojoaque,
  solarizedLight,
  atomDark,
  tomorrow,
};

/* ---------------------- import Prism language parsers --------------------- */
import javascript from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import python from "react-syntax-highlighter/dist/cjs/languages/prism/python";
import rust from "react-syntax-highlighter/dist/cjs/languages/prism/rust";
import java from "react-syntax-highlighter/dist/cjs/languages/prism/java";
import elixir from "react-syntax-highlighter/dist/cjs/languages/prism/elixir";
import c from "react-syntax-highlighter/dist/cjs/languages/prism/c";
import csharp from "react-syntax-highlighter/dist/cjs/languages/prism/csharp";

/* -------------------------------------------------------------------------- */
/*                          REGISTER LANGUAGE PARSERS                         */
/* -------------------------------------------------------------------------- */
const languageParsers = {
  javascript,
  typescript,
  python,
  rust,
  java,
  elixir,
  c,
  csharp,
};

// NOTE: encountered issue during build phase where
// cjs import paths were inconsistent between SSG build
// and client download, solved by the 'formatParser' function

const formatParser = (parser: any) => {
  if (typeof parser === "function") return parser;
  if (typeof parser.default === "function") return parser.default;

  throw Error("No valid parser function found from grammar import");
};

Object.entries(languageParsers).forEach(([title, parser]) =>
  SyntaxHighlighter.registerLanguage(title, formatParser(parser))
);
/* -------------------------------------------------------------------------- */
/*                            CODE SAMPLE COMPONENT                           */
/* -------------------------------------------------------------------------- */

type CodeSampleLanguage = keyof typeof languageParsers;

export interface Sample {
  language: CodeSampleLanguage;
  code: string;
}

interface Props {
  sample: Sample;
}

const CodeSample = (props: Props) => {
  // const [loaded, setLoaded] = useState(false);
  // useEffect(() => {
  //   setLoaded(true);
  // });
  const { code, language } = props.sample;
  const styles = Object.entries(themes);
  const [theme, setTheme] = useState(0);
  const [showLines, setShowLines] = useState(false);

  const updateTheme = () => {
    if (theme === styles.length - 1) {
      setTheme(0);
    } else {
      setTheme(theme + 1);
    }
  };
  // if (!loaded) {
  //   return <p>...loading...</p>;
  // }
  return (
    <div>
      <input
        type="checkbox"
        name="show lines"
        id="show-lines"
        checked={showLines}
        onChange={() => setShowLines(!showLines)}
      />
      <p>Theme: {styles[theme][0]}</p>
      <SyntaxHighlighter
        showLineNumbers={showLines}
        customStyle={{
          borderRadius: "5px",
          fontSize: "1em",
          lineHeight: "1.5em",
          padding: "1em",
          margin: "0.5em 0px",
          border: "0 solid black",
        }}
        onClick={updateTheme}
        language={language}
        style={styles[theme][1]}
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeSample;
