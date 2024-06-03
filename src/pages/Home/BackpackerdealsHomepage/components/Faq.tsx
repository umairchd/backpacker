import React, { FC, useState } from "react";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, { AccordionSummaryProps } from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useServerContext } from "@@/pages/lib/ServerContextProvider";
import { accordionFaqDatas } from "../utils";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion
    disableGutters
    elevation={0}
    square
    {...props}
  />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:before": {
    display: "none",
  },
  marginBottom: "14px",
  borderRadius: "6px",
}));

const TypographyH2 = styled(Typography)(() => ({
  fontSize: "18px",
  fontWeight: 600,
  fontFamily: "var(--font-primary)",
  "@media (max-width: 767px)": {
    fontSize: "16px",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(2),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2, 4, 2, 4),
}));

const Content = styled("div")(() => ({
  fontSize: "16px",
  fontFamily: "var(--font-primary)",
  "& a": {
    color: "var(--bs-primary)",
    textDecoration: "underline",
  },
  "@media (max-width: 767px)": {
    fontSize: "14px",
  },
}));

const TitleFAQ = styled("h2")(() => ({
  fontSize: "28px",
  lineHeight: "46px",
  margin: "0 0 1rem 0",
  fontWeight: "bold",
  textAlign: "left",
  fontFamily: "var(--font-primary)",
  "@media (max-width: 767px)": {
    fontSize: "20px",
    lineHeight: "30px",
  },
}));

const Section = styled("section")(() => ({
  margin: "45px 0 15px 0",
  padding: "0 !important",
}));

const Faq: FC = () => {
  const [expanded, setExpanded] = useState<string | false>("what-is-backpacker-deals");
  const { channel } = useServerContext();
  const handleChange = (answer: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? answer : false);
  };

  return (
    <Section
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      <TitleFAQ>FAQ</TitleFAQ>

      {accordionFaqDatas.map((item) => (
        <Accordion
          itemScope
          itemProp="mainEntity"
          itemType="https://schema.org/Question"
          key={item.id}
          expanded={expanded === item.id}
          onChange={handleChange(item.id)}
        >
          <AccordionSummary
            aria-controls={item.id}
            id={item.id}
          >
            <TypographyH2 itemProp="name">{item.question}</TypographyH2>
          </AccordionSummary>
          <AccordionDetails>
            <div
              itemProp="author"
              itemScope
              itemType="https://schema.org/Person"
            >
              <span
                className="hidden"
                itemProp="name"
              >
                {channel.name}
              </span>
            </div>

            <span
              className="hidden"
              itemProp="answerCount"
            >
              1
            </span>

            <div
              itemScope
              itemProp="acceptedAnswer"
              itemType="https://schema.org/Answer"
            >
              <Content
                itemProp="text"
                dangerouslySetInnerHTML={{ __html: item.answer }}
                suppressHydrationWarning
              />

              <span
                className="hidden"
                itemProp="url"
              >
                {`#${item.id}`}
              </span>

              <span
                className="hidden"
                itemProp="upvoteCount"
              >
                0
              </span>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </Section>
  );
};

export default Faq;
