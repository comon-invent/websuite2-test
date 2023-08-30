import "../styles/tailwind.css"
import "../styles/custom.css"
import { Analytics } from '@vercel/analytics/react';
import { AppProps } from "next/app"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}

export default MyApp
