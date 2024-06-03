import React, { FC, useState, useCallback } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

import { useServerContext } from "@@/pages/lib/ServerContextProvider";
import { styled } from "@mui/material/styles";
import { CustomAccordionSummaryProps, FAQCardProps } from "./types";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion
    disableGutters
    elevation={0}
    square
    {...props}
  />
))(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  "&:before": {
    display: "none",
  },
  marginBottom: "14px",
}));

const TypographyH2 = styled(Typography)(() => ({
  fontSize: "18px",
  fontWeight: 600,
  fontFamily: "var(--font-primary)",
  "@media (max-width: 767px)": {
    fontSize: "16px",
  },
}));

const AccordionSummary = styled(
  ({ expandedItems, index, ...props }: CustomAccordionSummaryProps & { expandedItems: number[] }) => (
    <MuiAccordionSummary
      expandIcon={
        expandedItems.includes(index) ? (
          <RemoveIcon sx={{ fontSize: "1.2rem", color: "var(--primary)" }} />
        ) : (
          <AddIcon sx={{ fontSize: "1.2rem", color: "var(--primary)" }} />
        )
      }
      {...props}
    />
  ),
)(({ theme }) => ({
  "& .MuiAccordionSummary-content": {
    marginRight: theme.spacing(2),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(1, 2, 1, 2),
}));

const Content = styled("div")(() => ({
  fontSize: "16px",
  fontFamily: "var(--font-primary)",
  "& a": {
    color: "var(--primary)",
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
  padding: "0 !important",
}));

const FAQCard: FC<FAQCardProps> = ({ faqs, isBanner }) => {
  const { channel } = useServerContext();
  const [expandedItems, setExpandedItems] = useState<number[]>([0]);

  const handleToggleAccordion = useCallback(
    (index: number) => {
      const newExpandedItems = [...expandedItems];
      const itemIndex = newExpandedItems.indexOf(index);
      if (itemIndex === -1) {
        newExpandedItems.push(index);
      } else {
        newExpandedItems.splice(itemIndex, 1);
      }
      setExpandedItems(newExpandedItems);
    },
    [expandedItems],
  );

  const handleToggleAll = useCallback(() => {
    if (expandedItems.length === faqs.length) {
      setExpandedItems([]);
    } else {
      setExpandedItems(faqs.map((_, index) => index));
    }
  }, [expandedItems, faqs]);

  return (
    <Section
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      <TitleFAQ
        id="faqs"
        style={{
          scrollMarginTop: isBanner ? "230px" : "200px",
        }}
        className="heading flex justify-between align-center items-start"
      >
        Frequently Asked Questions
        <button
          onClick={handleToggleAll}
          className="text-primary cursor-pointer text-sm md:text-lg font-bold text-right w-48"
        >
          {expandedItems.length === faqs.length ? "Hide all" : "Expand all"}
        </button>
      </TitleFAQ>

      {faqs.map((faq, index) => (
        <Accordion
          itemScope
          itemProp="mainEntity"
          itemType="https://schema.org/Question"
          key={index}
          expanded={expandedItems.includes(index)}
          onChange={() => handleToggleAccordion(index)}
        >
          <AccordionSummary
            expandedItems={expandedItems}
            index={index}
          >
            <TypographyH2 itemProp="name">{faq.question}</TypographyH2>
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
                dangerouslySetInnerHTML={{ __html: faq.answer.text }}
                suppressHydrationWarning
              />

              <span
                className="hidden"
                itemProp="url"
              >
                {`#faq-${index}`}
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

export default FAQCard;
