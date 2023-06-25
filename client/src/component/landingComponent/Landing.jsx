import React from "react";
import {
  Navbar,
  Hero,
  AccountingSystem,
  TableLanding,
  AccordionLanding,
  Cta,
  Footer,
  Testimonials,
} from "./index";

const Landing = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <AccountingSystem />
      <TableLanding />
      {/* <Testimonials /> */}
      <AccordionLanding />
      {/* <Cta /> */}
      {/* <Footer /> */}
    </>
  );
};

export default Landing;
