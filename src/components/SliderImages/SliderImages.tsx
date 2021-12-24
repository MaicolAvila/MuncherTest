import React, { useEffect, useState } from "react";
import "./SliderImages.scss";
import styled from "styled-components";
import {
  breakpoint_mobile_big,
  breakpoint_mobile_small,
} from "../../styles/styles";
import { ReactComponent as IcoLeft } from "../../assets/icons/left-arrow.svg";
import { ReactComponent as IcoRight } from "../../assets/icons/right-arrow.svg";

const Slide = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media (min-width: 0) and (max-width: ${breakpoint_mobile_small}) {
  }
  @media (min-width: ${breakpoint_mobile_small}) and (max-width: ${breakpoint_mobile_big}) {
  }
`;

export default function SliderImages(images: any) {
  const [ImagesList, setImagesList] = useState([]);
  const [Count, setCount] = useState(0);
  const [activeLeft, setActiveLeft] = useState(true);
  const [activeRight, setActiveRight] = useState(true);

  useEffect(() => {
    console.log(images.images);
    setImagesList(images.images);
  }, [ImagesList]);

  useEffect(() => {
    if (Count > 0) {
      setActiveLeft(true);
    } else {
      setActiveLeft(false);
    }
    if (Count < ImagesList.length - 1) {
      setActiveRight(true);
    } else {
      setActiveRight(false);
    }
  }, [Count, activeLeft, activeRight]);

  const beforeImage = () => {
    if (Count > 0) setCount(Count - 1);
  };

  const nextImage = () => {
    if (Count < ImagesList.length - 1) setCount(Count + 1);
  };

  const ArrowLeft = styled(IcoLeft)`
    cursor: ${activeLeft ? "pointer" : "no-drop"};
    position: absolute;
    left: 0;
    top: 50%;
    opacity: ${activeLeft ? "1" : "0.5"};
    @media (min-width: 0) and (max-width: ${breakpoint_mobile_small}) {
    }
    @media (min-width: ${breakpoint_mobile_small}) and (max-width: ${breakpoint_mobile_big}) {
    }
  `;

  const ArrowRight = styled(IcoRight)`
    cursor: ${activeRight ? "pointer" : "no-drop"};
    position: absolute;
    right: 0;
    top: 50%;
    opacity: ${activeRight ? "1" : "0.5"};
    @media (min-width: 0) and (max-width: ${breakpoint_mobile_small}) {
    }
    @media (min-width: ${breakpoint_mobile_small}) and (max-width: ${breakpoint_mobile_big}) {
    }
  `;

  return (
    <Slide>
      <ArrowLeft onClick={beforeImage} />
      <img style={{ width: "80%" }} src={ImagesList[Count]} alt="" />
      <ArrowRight onClick={nextImage} />
    </Slide>
  );
}
