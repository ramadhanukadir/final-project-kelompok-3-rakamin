import React from "react";
import {
  Navbar,
  Hero,
  AccountingSystem,
  TableLanding,
  AccordionLanding,
  Cta,
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
    </>
  );
};

export default Landing;
