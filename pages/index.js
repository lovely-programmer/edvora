import Head from 'next/head'
import Navbar from "../components/Navbar"
import Features from "../components/Features"

export default function Home() {
  return (
    <div>
      <Head>
        <title>Edvora</title>
        <meta name="description" content="Edvora ride is the fastest and reliable ride" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <Features />
    </div>
  )
}
