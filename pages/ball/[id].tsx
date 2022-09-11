import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import styles from '../../styles/Home.module.css'

const NFT: NextPage = () => {
  const router = useRouter();
  if (!router.isFallback && !router.query.id) {
    return (<div></div>);
}

  return (
    <><div className={styles.container} suppressHydrationWarning={true}>
      <Head>
        <title>NFT</title>
        <meta name="description" content={`Ball #${router.query.id}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

        <div className="wrap">
          <section className="stage">
            <figure className="ball">
              <span className="number" data-number={router.query.id}>&nbsp;</span>
            </figure>
          </section>
        </div>
      </main>
    </div>
    <style jsx>{`
.ball {
  display: grid;
  width: 100%;
  height: 100%;
  margin: 0;
  border-radius: 50%;
  position: relative;
  background: radial-gradient(circle at 50% 40%, #fcfcfc, #efeff1 66%, #9b5050 100%);
  overflow: hidden;
  animation: ballGrow 2s ease-out forwards;
  transform: scale(0.5);
}
.ball:after {
  content: "";
  position: absolute;
  top: 5%;
  left: 10%;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8) 14%, rgba(255, 255, 255, 0) 24%);
  -webkit-transform: translateX(-80px) translateY(-90px) skewX(-20deg);
  -moz-transform: translateX(-80px) translateY(-90px) skewX(-20deg);
  -ms-transform: translateX(-80px) translateY(-90px) skewX(-20deg);
  -o-transform: translateX(-80px) translateY(-90px) skewX(-20deg);
  transform: translateX(-80px) translateY(-90px) skewX(-20deg);
}

.stage {
  width: 300px;
  height: 300px;
  display: inline-block;
  margin: 20px;
  -webkit-perspective: 1200px;
  -moz-perspective: 1200px;
  -ms-perspective: 1200px;
  -o-perspective: 1200px;
  perspective: 1200px;
  -webkit-perspective-origin: 50% 50%;
  -moz-perspective-origin: 50% 50%;
  -ms-perspective-origin: 50% 50%;
  -o-perspective-origin: 50% 50%;
  perspective-origin: 50% 50%;
}

.number {
  position: absolute;
  width: 100%;
  text-align: center;
  line-height: 300px;
  font-size: 160px;
  color: blue;
  font-family: 'Roboto', sans-serif;
  animation: ballRoll 2s ease-out;
}

.number:after {
  content: attr(data-number);
  position: absolute;
  transform: translateX(-75%);
  opacity: 0;
  animation: numberReveal 0.1s 1.5s reverse forwards;
}

.number:before {
  content: '?';
  position: absolute;
  transform: translateX(-25%);
  animation: numberReveal 0.1s 1.5s forwards;
}

@keyframes ballRoll {
  0%, 20%, 50% {
    opacity: 1;
    transform: translateY(0) rotateX(0) scale(1);
  }
  10%, 35%, 75% {
    transform: translateY(100%) rotateX(170deg) scale(0.4);
  }
  11%, 36%, 76% {
    transform: translateY(-100%) rotateX(-170deg) scale(0.3);
    opacity: 0;
  }

}

@keyframes ballGrow {
  0% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes numberReveal {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}


.stage:nth-child(2) .ball,
.stage:nth-child(2) .number {
  animation-delay: 0.3s;
}

.stage:nth-child(2) .number:after,
.stage:nth-child(2) .number:before {
  animation-delay: 1.8s;
}

.stage:nth-child(3) .ball,
.stage:nth-child(3) .number {
  animation-delay: 0.6s;
}

.stage:nth-child(3) .number:after,
.stage:nth-child(3) .number:before {
  animation-delay: 2.1s;
}

.stage:nth-child(4) .ball,
.stage:nth-child(4) .number {
  animation-delay: 0.9s;
}

.stage:nth-child(4) .number:after,
.stage:nth-child(4) .number:before {
  animation-delay: 2.4s;
}

`}</style>
<style jsx global>{`
html,
body {
  overflow: hidden;
  padding: 0;
  margin: 0;
  font-family: Permanent Marker;
  background: linear-gradient(-45deg, #0F2027, #203A43, #2C5364);
  color: white;
  width: 100vw;
  height: 100vh;
  display: grid;
  align-items: center;
  justify-items: center;
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}

`}</style></>
  )
}

export default NFT
export async function getStaticPaths() {

  return {
    paths: Array.from({ length: 5000 }).map((nft, index) => {
      return {
        params: {
          id: index.toString(),
        },
      };
    }),
    fallback: false,
  };
}



export async function getStaticProps({ params }: { params: { id: string } }) {
  return {
    props: {
      id: params.id
    },
  };
}