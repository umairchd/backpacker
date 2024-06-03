import React, { FC, useState } from "react";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useServerContext } from "@@/pages/lib/ServerContextProvider";
import { accordionFaqDatas } from "../utils";

import classes from "../CampervanHire.module.scss";

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
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

const FAQCampervan: FC = () => {
  const [expanded, setExpanded] = useState<string | false>(
    "what-is-a-campervan"
  );
  const { channel } = useServerContext();
  const handleChange =
    (answer: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? answer : false);
    };

  return (
    <div className="container">
      <div
        itemScope
        itemType="https://schema.org/FAQPage"
        className={classes["section-center"]}
      >
        <div className={classes["faq-section"]}>
          <h2>Frequently asked questions</h2>

          {accordionFaqDatas.map((item) => (
            <MuiAccordion
              disableGutters
              elevation={0}
              square
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
              key={item.id}
              expanded={expanded === item.id}
              onChange={handleChange(item.id)}
              className={
                expanded === item.id
                  ? classes["faq-item-active"]
                  : classes["faq-item"]
              }
            >
              <AccordionSummary
                aria-controls={item.id}
                id={item.id}
                className={classes["faq-item-summary"]}
              >
                <Typography variant="h2" itemProp="name">
                  {item.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div
                  itemProp="author"
                  itemScope
                  itemType="https://schema.org/Person"
                >
                  <span className="hidden" itemProp="name">
                    {channel.name}
                  </span>
                </div>

                <span className="hidden" itemProp="answerCount">
                  1
                </span>

                <div
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <p
                    itemProp="text"
                    dangerouslySetInnerHTML={{ __html: item.answer }}
                    suppressHydrationWarning
                    className={classes["faq-item-answer"]}
                  />

                  <span className="hidden" itemProp="url">
                    {`#${item.id}`}
                  </span>

                  <span className="hidden" itemProp="upvoteCount">
                    0
                  </span>
                </div>
              </AccordionDetails>
            </MuiAccordion>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQCampervan;
