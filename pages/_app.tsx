import "../styles/globals.css";
import type { AppProps } from "next/app";
import Wrapper from "../components/Wrapper";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useAuth, AuthUserProvider } from "../context/firebaseUserContext";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const pathName = router.pathname;
  return (
    <AuthUserProvider>
      <Wrapper>
        <div
          className={`pt-4 ${
            pathName === "/" && "pt-0 w-full h-full bg-white"
          } `}
        >
          <Component {...pageProps} />
        </div>
      </Wrapper>
    </AuthUserProvider>
  );
}

/* bg-indigo-800 p-2 px-3 text-white rounded shadow hover:text-indigo-800 hover:border border-indigo-800 hover:bg-white */
