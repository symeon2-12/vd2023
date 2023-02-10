"use client";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import styled, { keyframes } from "styled-components";
import { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

const Main = styled.main`
  position: relative;
  width: 100%;
  height: 100%;
`;

const CursorDrag = styled.div<{
  x: number;
  y: number;
  width: number;
  height: number;
}>`
  display: block;
  background-color: black;
  position: absolute;
  left: ${(props) => props.x - props.width / 2 + "px"};
  top: ${(props) => props.y - props.height / 2 + "px"};
  height: ${(props) => props.height + "px"};
  width: ${(props) => props.width + "px"};
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

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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
        <title>NN</title>
        <meta name="description" content="$$$$$insert" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icons8-favorite-64.png" />
      </Head>
      <Main>
        asdfasdf2 {mousePos.x} {mousePos.y}
        <CursorDrag x={mousePos.x} y={mousePos.y} height={100} width={100}>
          <Flame>
            <RedFlame />
            <OrangeFlame />
            <YellowFlame />
            <WhiteFlame />
            <BlueFlame />
            <BlackFlame />
          </Flame>
        </CursorDrag>
      </Main>
    </>
  );
}
