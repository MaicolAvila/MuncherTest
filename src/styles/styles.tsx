import styled from "styled-components";
import { Link } from "react-router-dom";

export const breakpoint_latop_1024 = "1024px";
export const breakpoint_iPad = "768px";
export const breakpoint_mobile_big = "600px";
export const breakpoint_mobile_small = "500px";

export const Button = styled.button`
  font-size: 18px;
  color: #fff;
  border-radius: 1em;
  border: none;
  padding: 0.45em 1.75em;
  transition: all 500ms ease-in-out;
  font-family: "Roboto";
  &:hover {
    padding: 0.65em 2.45em;
  }

  @media (min-width: 0) and (max-width: ${breakpoint_mobile_small}) {
    font-size: 14px;
  }
  @media (min-width: ${breakpoint_mobile_small}) and (max-width: ${breakpoint_mobile_big}) {
    font-size: 16px;
  }
`;

export const VioletButton = styled(Button)`
  background: linear-gradient(
    91.82deg,
    #210124 0.54%,
    rgba(33, 1, 36, 0.56) 97.64%
  );
`;

export const BlueButton = styled(Button)`
  background: linear-gradient(
    91.82deg,
    #20a4f3 0.54%,
    rgba(32, 164, 243, 0.56) 97.64%
  );
`;

export const Title = styled.h1`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  margin: 0px;

  color: #656565;

  @media (min-width: 0) and (max-width: ${breakpoint_mobile_small}) {
    font-size: 14px;
  }
  @media (min-width: ${breakpoint_mobile_small}) and (max-width: ${breakpoint_mobile_big}) {
    font-size: 16px;
  }
`;

export const Label = styled.label`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  color: #455561;

  @media (min-width: 0) and (max-width: ${breakpoint_mobile_small}) {
    font-size: 12px;
  }
  @media (min-width: ${breakpoint_mobile_small}) and (max-width: ${breakpoint_mobile_big}) {
    font-size: 14px;
  }
`;

export const Input = styled.input`
  padding: 0.45em 1.75em;
  width: -webkit-fill-available;
  border: 1px solid #455561;
  border-radius: 1em;
  outline: none;
  fill: #455561;
  color: #455561;
`;

export const LinkStyle = styled(Link)`
  font-size: 18px;
  color: #fff;
  border-radius: 1em;
  border: none;
  padding: 0.45em 1.75em;
  transition: all 500ms ease-in-out;
  font-family: "Roboto";
  &:hover {
    padding: 0.65em 2.45em;
  }

  @media (min-width: 0) and (max-width: ${breakpoint_mobile_small}) {
    font-size: 14px;
  }
  @media (min-width: ${breakpoint_mobile_small}) and (max-width: ${breakpoint_mobile_big}) {
    font-size: 16px;
  }
`;

export const VioletLink = styled(LinkStyle)`
  background: linear-gradient(
    91.82deg,
    #210124 0.54%,
    rgba(33, 1, 36, 0.56) 97.64%
  );
`;

export const BlueLink = styled(LinkStyle)`
  background: linear-gradient(
    91.82deg,
    #20a4f3 0.54%,
    rgba(32, 164, 243, 0.56) 97.64%
  );
`;
