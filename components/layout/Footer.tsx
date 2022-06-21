import React from "react";
import Link from "next/link";

import { FooterWrapper, ContentWrapper, HighlightLink } from "./styles";

const Footer = () => {
  return (
    <FooterWrapper>
      <ContentWrapper>
        <div>
          Powered By
          <HighlightLink>
            <a target="_blank" href="https://www.linkedin.com/in/toannhu/">
              TOEIC Thật Dễ Dàng
            </a>
          </HighlightLink>
        </div>

        <div>
          <HighlightLink>
            <Link href="/data-privacy">Data Privacy</Link>
          </HighlightLink>
        </div>
      </ContentWrapper>
    </FooterWrapper>
  );
};

export default Footer;
