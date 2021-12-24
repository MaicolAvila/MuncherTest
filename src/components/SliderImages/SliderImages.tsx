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

const ArrowLeft = styled(IcoLeft)`
  cursor: pointer;
  position: absolute;
  left: 0;
  top: 50%;
  @media (min-width: 0) and (max-width: ${breakpoint_mobile_small}) {
  }
  @media (min-width: ${breakpoint_mobile_small}) and (max-width: ${breakpoint_mobile_big}) {
  }
`;

const ArrowRight = styled(IcoRight)`
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 50%;
  @media (min-width: 0) and (max-width: ${breakpoint_mobile_small}) {
  }
  @media (min-width: ${breakpoint_mobile_small}) and (max-width: ${breakpoint_mobile_big}) {
  }
`;

export default function SliderImages(images: any) {
  const [ImagesList, setImagesList] = useState([]);
  const [Count, setCount] = useState(0);

  useEffect(() => {
    console.log(images.images);
    setImagesList(images.images);
  }, [ImagesList]);

  const beforeImage = () => {
    if (Count > 0) setCount(Count - 1);
  };

  const nextImage = () => {
    console.log("intent");
    console.log(Count);
    console.log(ImagesList);
    if (Count < ImagesList.length) setCount(Count + 1);
  };

  return (
    <Slide>
      <ArrowLeft onClick={beforeImage} />
      <img style={{ width: "80%" }} src={ImagesList[Count]} alt="" />
      <ArrowRight onClick={nextImage} style={{ cursor: "pointer" }} />
    </Slide>
  );
}
