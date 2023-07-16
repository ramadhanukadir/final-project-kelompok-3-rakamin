import React from "react";
import {
  Navbar,
  Hero,
  AccountingSystem,
  TableLanding,
  AccordionLanding,
  Cta,
  Footer,
} from "./index";

const Landing = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <AccountingSystem />
      <TableLanding />
      <AccordionLanding />
      <Cta />
      <Footer />
    </>
  );
};

export default Landing;
