"use client";
import Head from "next/head";
import Image from "next/image";
import { Indie_Flower } from "@next/font/google";
import { Beau_Rivage } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import styled, { keyframes } from "styled-components";
import { useState, useEffect } from "react";

const f1 = Indie_Flower({ subsets: ["latin"], weight: "400" });
const f2 = Beau_Rivage({ subsets: ["latin-ext", "latin"], weight: "400" });

const Main = styled.main`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  font-size: 3rem;
  font-weight: bold;
  @media (max-width: 800px) {
    font-size: 2rem;
  }
  @media (max-width: 500px) {
    font-size: 1.3rem;
  }
`;
const Text = styled.div`
  max-width: 1000px;
  justify-content: center;
`;

const CursorDrag = styled.div<{
  x: number;
  y: number;
  width: number;
  height: number;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(
    circle,
    rgba(0, 0, 0, 0) 0%,
    rgba(245, 218, 40, 0.7) 4%,
    rgba(159, 88, 30, 1) 10%,
    rgba(0, 2, 3, 1) 18%
  );

  position: absolute;
  /* left: ${(props) => props.x - props.width / 2 + "px"}; */
  /* top: ${(props) => props.y - props.height / 2 + "px"}; */
  left: calc(
    ${(props) => props.x + "px"} - ${(props) => props.width / 2 + "vw"}
  );
  top: calc(
    ${(props) => props.y + "px"} - ${(props) => props.height / 2 + "vh"}
  );
  height: ${(props) => props.height + "vh"};
  width: ${(props) => props.width + "vw"};
`;

const flickerAnim = keyframes`
  0%   {transform: rotate(-1deg);}
  20%  {transform: rotate(1deg);}
  40%  {transform: rotate(-1deg);}
  60%  {transform: rotate(1deg) scaleY(1.04);}
  80%  {transform: rotate(-2deg) scaleY(0.92);}
  100% {transform: rotate(1deg);}
  `;

const Flame = styled.div`
  margin: 80px auto;
  width: 60px;
  height: 60px;
  position: relative;
  top: 100px;
  transform-origin: center bottom;
  animation-name: ${flickerAnim};
  animation-duration: 30ms;
  animation-delay: 200ms;
  animation-timing-function: ease-in;
  animation-iteration-count: infinite;
  animation-direction: alternate;
`;
const FlameAll = styled.div`
  bottom: 0;
  position: absolute;
  border-bottom-right-radius: 50%;
  border-bottom-left-radius: 50%;
  border-top-left-radius: 50%;
  transform: rotate(-45deg) scale(1.5, 1.5);
`;
const RedFlame = styled(FlameAll)`
  left: 5px;
  width: 50px;
  height: 50px;
  background: OrangeRed;
  box-shadow: 0px 0px 5px 4px OrangeRed;
`;
const OrangeFlame = styled(FlameAll)`
  left: 10px;
  width: 40px;
  height: 40px;
  background: orange;
  box-shadow: 0px 0px 9px 4px orange;
`;
const YellowFlame = styled(FlameAll)`
  left: 15px;
  width: 30px;
  height: 30px;
  background: gold;
  box-shadow: 0px 0px 9px 4px gold;
`;
const WhiteFlame = styled(FlameAll)`
  left: 15px;
  bottom: -4px;
  width: 30px;
  height: 30px;
  background: white;
  box-shadow: 0px 0px 9px 4px white;
`;
const BlueFlame = styled(FlameAll)`
  border-radius: 50%;
  position: absolute;
  width: 10px;
  height: 10px;
  left: 25px;
  bottom: -25px;
  background: SlateBlue;
  box-shadow: 0px 0px 15px 10px SlateBlue;
`;
const BlackFlame = styled(FlameAll)`
  border-radius: 50%;
  position: absolute;
  width: 40px;
  height: 40px;
  left: 10px;
  bottom: -60px;
  background: black;
  box-shadow: 0px 0px 15px 10px black;
`;

const TextTimeLeft = styled.p`
  text-align: center;
`;
const VText = styled.p`
  text-align: center;
  margin: 0 15px 0 15px;
`;

const VText2 = styled(VText)`
  text-align: left;
  margin-top: 15px;
`;

const VText3 = styled(VText)`
  text-align: left;
`;

const VTextAfter = styled(VText)``;

const vDay = new Date("2023-02-14 00:00");

function msToTime(timeInms: number) {
  // Pad to 2 or 3 digits, default is 2
  function pad(n: number, z?: number) {
    z = z || 2;
    return ("00" + n).slice(-z);
  }

  var ms = timeInms % 1000;
  timeInms = (timeInms - ms) / 1000;
  var secs = timeInms % 60;
  timeInms = (timeInms - secs) / 60;
  var mins = timeInms % 60;
  timeInms = (timeInms - mins) / 60;
  var hrs = timeInms % 24;
  var days = (timeInms - hrs) / 24;

  return (
    pad(days) + "d " + pad(hrs) + "h " + pad(mins) + "m " + pad(secs) + "s"
  );
}

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [timeLeftToVD, setTimeLeftToVD] = useState(
    vDay.getTime() - new Date("2023-02-12 00:00").getTime()
  );

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const getTime = async () => {
      const a = await fetch("https://worldtimeapi.org/api/timezone/" + tz)
        .then((response) => response.json())
        .then((data) => {
          return data.datetime;
        });

      setTimeLeftToVD(vDay.getTime() - new Date(a).getTime());
    };

    getTime();

    return () => {};
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeftToVD((seconds) => seconds - 1000);
    }, 1000);
    console.log("is it time", timeLeftToVD, timeLeftToVD < 0);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleTouchMove = (event: TouchEvent) => {
      setMousePos({ x: event.touches[0].clientX, y: event.touches[0].clientY });
    };

    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Walentynki 2023</title>
        <meta name="description" content="conent" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icons8-favorite-64.png" />
      </Head>
      <Main className={f2.className}>
        <Text>
          {timeLeftToVD > 0 && (
            <>
              <TextTimeLeft className={f1.className}>
                ❤️ Czas do Walentynek:
              </TextTimeLeft>
              <TextTimeLeft className={f1.className}>
                {msToTime(timeLeftToVD)}
              </TextTimeLeft>
            </>
          )}
          {/* prettier-ignore */}
          {timeLeftToVD <= 0 && (
            <>
              <VText>Najdroższa Natuś</VText>
              <VText>Dziękuję Ci, że jesteś moją Walentyką❤️</VText>
              <VText>Ale ja Kocham Cię każdego dnia tak samo...</VText>
              <VText>Czekaj. Każdego dnia chcę Cię kochać coraz bardziej</VText>
              <VText>
                Chcę, żebyś czuła, że będę przy Tobie w każdej sytuacji{" "}
              </VText>
              <VText>Moje serce śmieje się z Twoim </VText>
              <VText>Moja dusza płacze z Twoją </VText>
              <VText>Mój duch raduje się z Twoim</VText>
              <VText>Dziękuję Ci, że jesteś</VText>
              <VText2>Na zawsze Twój</VText2>
              <VText3>Szymuś</VText3>
              {/* asdfasdf2 {mousePos.x} {mousePos.y} timeLeft: {timeLeftToVD} timeLeft2:{" "}
        {msToTime(timeLeftToVD)} */}
            </>
          )}
        </Text>
        {/* <CursorDrag x={mousePos.x} y={mousePos.y} height={400} width={400}>
          <Flame>
            <RedFlame />
            <OrangeFlame />
            <YellowFlame />
            <WhiteFlame />
            <BlueFlame />
            <BlackFlame />
          </Flame>
        </CursorDrag> */}
      </Main>
    </>
  );
}
