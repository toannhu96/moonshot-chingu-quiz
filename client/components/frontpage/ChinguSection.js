import React from "react";
import Link from "next/link";
import styled, { css } from "styled-components";
import { breakpoint } from "../../frontend-config";
import { Heading2, TextBody } from "../shared/styles";

const SVG = () => {
  return (
    <svg
      width="540"
      height="441"
      viewBox="0 0 540 441"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0"
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="540"
        height="441"
      >
        <rect y="0.459961" width="540" height="440" fill="white" />
      </mask>
      <g mask="url(#mask0)">
        <rect
          opacity="0.02"
          y="0.459961"
          width="540"
          height="440"
          fill="#3C64B1"
        />
        <g opacity="0.06">
          <path d="M0 0.459961L540 440.46" stroke="#3C64B1" />
          <path d="M21.0938 -16.7275L561.094 423.272" stroke="#3C64B1" />
          <path d="M42.1875 -33.915L582.188 406.085" stroke="#3C64B1" />
          <path d="M63.2812 -51.1025L603.281 388.897" stroke="#3C64B1" />
          <path d="M84.375 -68.29L624.375 371.71" stroke="#3C64B1" />
          <path d="M105.469 -85.4775L645.469 354.522" stroke="#3C64B1" />
          <path d="M126.562 -102.665L666.562 337.335" stroke="#3C64B1" />
          <path d="M147.656 -119.853L687.656 320.147" stroke="#3C64B1" />
          <path d="M168.75 -137.04L708.75 302.96" stroke="#3C64B1" />
          <path d="M189.844 -154.228L729.844 285.772" stroke="#3C64B1" />
          <path d="M210.938 -171.415L750.938 268.585" stroke="#3C64B1" />
          <path d="M232.031 -188.603L772.031 251.397" stroke="#3C64B1" />
          <path d="M253.125 -205.79L793.125 234.21" stroke="#3C64B1" />
          <path d="M-21.0938 17.6475L518.906 457.647" stroke="#3C64B1" />
          <path d="M-42.1875 34.835L497.812 474.835" stroke="#3C64B1" />
          <path d="M-63.2812 52.0225L476.719 492.022" stroke="#3C64B1" />
          <path d="M-84.375 69.21L455.625 509.21" stroke="#3C64B1" />
          <path d="M-105.469 86.3975L434.531 526.397" stroke="#3C64B1" />
          <path d="M-126.562 103.585L413.438 543.585" stroke="#3C64B1" />
          <path d="M-147.656 120.772L392.344 560.772" stroke="#3C64B1" />
          <path d="M-168.75 137.96L371.25 577.96" stroke="#3C64B1" />
          <path d="M-189.844 155.147L350.156 595.147" stroke="#3C64B1" />
          <path d="M-210.938 172.335L329.062 612.335" stroke="#3C64B1" />
          <path d="M-232.031 189.522L307.969 629.522" stroke="#3C64B1" />
          <path d="M-253.125 206.71L286.875 646.71" stroke="#3C64B1" />
          <path d="M-274.219 223.897L265.781 663.897" stroke="#3C64B1" />
        </g>
        <g opacity="0.06">
          <path d="M10.5469 -8.13379L550.547 431.866" stroke="#3C64B1" />
          <path d="M31.6406 -25.3213L571.641 414.679" stroke="#3C64B1" />
          <path d="M52.7344 -42.5088L592.734 397.491" stroke="#3C64B1" />
          <path d="M73.8281 -59.6963L613.828 380.304" stroke="#3C64B1" />
          <path d="M94.9219 -76.8838L634.922 363.116" stroke="#3C64B1" />
          <path d="M116.016 -94.0713L656.016 345.929" stroke="#3C64B1" />
          <path d="M137.109 -111.259L677.109 328.741" stroke="#3C64B1" />
          <path d="M158.203 -128.446L698.203 311.554" stroke="#3C64B1" />
          <path d="M179.297 -145.634L719.297 294.366" stroke="#3C64B1" />
          <path d="M200.391 -162.821L740.391 277.179" stroke="#3C64B1" />
          <path d="M221.484 -180.009L761.484 259.991" stroke="#3C64B1" />
          <path d="M242.578 -197.196L782.578 242.804" stroke="#3C64B1" />
          <path d="M263.672 -214.384L803.672 225.616" stroke="#3C64B1" />
          <path d="M-10.5469 9.05371L529.453 449.054" stroke="#3C64B1" />
          <path d="M-31.6406 26.2412L508.359 466.241" stroke="#3C64B1" />
          <path d="M-52.7344 43.4287L487.266 483.429" stroke="#3C64B1" />
          <path d="M-73.8281 60.6162L466.172 500.616" stroke="#3C64B1" />
          <path d="M-94.9219 77.8037L445.078 517.804" stroke="#3C64B1" />
          <path d="M-116.016 94.9912L423.984 534.991" stroke="#3C64B1" />
          <path d="M-137.109 112.179L402.891 552.179" stroke="#3C64B1" />
          <path d="M-158.203 129.366L381.797 569.366" stroke="#3C64B1" />
          <path d="M-179.297 146.554L360.703 586.554" stroke="#3C64B1" />
          <path d="M-200.391 163.741L339.609 603.741" stroke="#3C64B1" />
          <path d="M-221.484 180.929L318.516 620.929" stroke="#3C64B1" />
          <path d="M-242.578 198.116L297.422 638.116" stroke="#3C64B1" />
          <path d="M-263.672 215.304L276.328 655.304" stroke="#3C64B1" />
        </g>
      </g>
    </svg>
  );
};

const Wrapper = styled.div`
  background: ${props => props.theme.colors.grey};
  padding: 45px 25px 65px;
  width: 100%;

  @media (min-width: ${breakpoint("lg")}) {
    padding: 115px 25px 190px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 730px;
  margin: 0 auto;
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
`;

const ContentSection = styled.div`
  h2 {
    color: ${props => props.theme.colors.light};
    margin-bottom: 32px;
  }

  p {
    color: ${props => props.theme.colors.light};
  }

  @media (max-width: ${breakpoint("xl")}) {
    min-width: 540px;
    h2,
    p {
      text-align: center;
    }
  }

  @media (min-width: ${breakpoint("xl")}) {
    min-width: 540px;
  }
`;

const ImageSection = styled.div`
  position: relative;
  display: none;
  @media (min-width: ${breakpoint("xl")}) {
    min-width: 540px;
    display: block;
  }
`;

export const Logo = styled.img`
  position: absolute;
  top: 60px;
  right: 80px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 56px;
  @media (max-width: ${breakpoint("xl")}) {
    justify-content: center;
  }
`;

const Button = styled.button`
  background: transparent;
  border: 1px solid #18e28c;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  line-height: 24px;
  margin-right: 24px;
  padding: 10px 20px;

  &:last-of-type {
    margin-right: 0;
  }

  ${props =>
    props.light &&
    css`
      background: ${props.theme.colors.midGreen};
      color: ${props.theme.colors.grey};
    `}

  ${props =>
    props.dark &&
    css`
      background: ${props.theme.colors.grey};
      color: ${props.theme.colors.midGreen};
    `}
`;

const ChinguSection = () => {
  return (
    <Wrapper>
      <ContentWrapper>
        <ImageSection>
          <Logo src="/home-chingu-image.png" />
          <SVG />
        </ImageSection>
        <ContentSection>
          <Heading2>What is Chingu?</Heading2>
          <TextBody>
            Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam
            no suscipit quaerendum. At nam minimum ponderum. Est audiam animal
            molestiae te. Ex duo eripuit mentitum.
          </TextBody>

          <ButtonsWrapper>
            <Link href="/contribute">
              <Button light>Primary action</Button>
            </Link>

            <Link href="/about">
              <Button dark>Secondary action</Button>
            </Link>
          </ButtonsWrapper>
        </ContentSection>
      </ContentWrapper>
    </Wrapper>
  );
};

export default ChinguSection;
