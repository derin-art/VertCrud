import "../styles/globals.css";
import type { AppProps } from "next/app";
import Wrapper from "../components/Wrapper";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const pathName = router.pathname;
  return (
    <Wrapper>
      <div className={`w-full h-full pt-4 ${pathName === "/" && "pt-0"}`}>
        <Component {...pageProps} />
      </div>
    </Wrapper>
  );
}

/* bg-indigo-800 p-2 px-3 text-white rounded shadow hover:text-indigo-800 hover:border border-indigo-800 hover:bg-white */
