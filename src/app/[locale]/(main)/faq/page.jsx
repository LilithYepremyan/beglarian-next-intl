"use client";

import MuiAccordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React from "react";
import { useSelector } from "react-redux";

import PageHeader from "@/components/PageHeader";
import { timeFromMinutes } from "@/components/Time";
import PlusIcon from "@/icons/PlusIcon";
import { events, track, Track } from "@/metrics";
import { useTranslations } from "next-intl";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({}));

function FAQ() {
  const [expanded, setExpanded] = React.useState(false);

  const t = {
    faq: useTranslations("faq"),
    main: useTranslations("faq.main"),
    reservation: useTranslations("faq.reservation"),
    same: useTranslations("faq.same"),
    processing: useTranslations("faq.processing"),
    blue: useTranslations("faq.blue"),
    invoice: useTranslations("faq.invoice"),
    delivery: useTranslations("faq.delivery"),
    minimal: useTranslations("faq.minimal"),
    cut: useTranslations("faq.cut"),
    defects: useTranslations("faq.defects"),
  };

  const handleChange = (panel) => (event, isExpanded) => {
    if (isExpanded) {
      track(events.faqPage.section.shown, { sectionName: panel });
    }

    setExpanded(isExpanded ? panel : false);
  };

  const {
    data: { reservationTimeoutInMinutes, firstOrder },
  } = useSelector((state) => state.user);

  return (
    <Box
      sx={{ alignItems: "center", display: "flex", flexDirection: "column" }}
    >
      <PageHeader title={t.faq("title")} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 840,
        }}
      >
        <Box>
          <Accordion
            expanded={expanded === "main"}
            onChange={handleChange("main")}
          >
            <AccordionSummary expandIcon={<PlusIcon />}>
              <Typography>{t.main("title")}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" component="div">
                {t.main.rich("text", {
                  ...(firstOrder ? { firstOrder } : {}),
                  br: () => <br />,
                  strong: (chunk) => <strong>{chunk}</strong>,
                  ul: (chunk) => <ul>{chunk}</ul>,
                  li: (chunk) => <li>{chunk}</li>,
                })}
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "reservation"}
            onChange={handleChange("reservation")}
          >
            <AccordionSummary expandIcon={<PlusIcon />}>
              <Typography>{t.reservation("title")}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" component="div">
                {t.reservation.rich("text", {
                  time: timeFromMinutes(reservationTimeoutInMinutes, true),
                  br: () => <br />,
                  strong: (chunk) => <strong>{chunk}</strong>,
                  ul: (chunk) => <ul>{chunk}</ul>,
                  li: (chunk) => <li>{chunk}</li>,
                })}
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "newsletter"}
            onChange={handleChange("newsletter")}
          >
            <AccordionSummary expandIcon={<PlusIcon />}>
              <Typography>
                {t.faq.rich("newsletter.title", {
                  br: () => <br />,
                  strong: (chunk) => <strong>{chunk}</strong>,
                })}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" component="div">
                {t.faq.rich("newsletter.text", {
                  br: () => <br />,
                  strong: (chunk) => <strong>{chunk}</strong>,
                })}
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "same"}
            onChange={handleChange("same")}
          >
            <AccordionSummary expandIcon={<PlusIcon />}>
              <Typography>{t.same("title")}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" component="div">
                {t.same.rich("text", {
                  br: () => <br />,
                  strong: (chunk) => <strong>{chunk}</strong>,
                  ul: (chunk) => <ul>{chunk}</ul>,
                  li: (chunk) => <li>{chunk}</li>,
                })}
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "processing"}
            onChange={handleChange("processing")}
          >
            <AccordionSummary expandIcon={<PlusIcon />}>
              <Typography>{t.processing("title")}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" component="div">
                {t.processing.rich("text", {
                  br: () => <br />,
                  strong: (chunk) => <strong>{chunk}</strong>,
                  ul: (chunk) => <ul>{chunk}</ul>,
                  li: (chunk) => <li>{chunk}</li>,
                })}
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "blue"}
            onChange={handleChange("blue")}
          >
            <AccordionSummary expandIcon={<PlusIcon />}>
              <Typography>{t.blue("title")}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" component="div">
                {t.blue.rich("text", {
                  br: () => <br />,
                  strong: (chunk) => <strong>{chunk}</strong>,
                  ul: (chunk) => <ul>{chunk}</ul>,
                  li: (chunk) => <li>{chunk}</li>,
                })}
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "invoice"}
            onChange={handleChange("invoice")}
          >
            <AccordionSummary expandIcon={<PlusIcon />}>
              <Typography>{t.invoice("title")}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" component="div">
                {t.invoice.rich("text", {
                  br: () => <br />,
                  strong: (chunk) => <strong>{chunk}</strong>,
                  ul: (chunk) => <ul>{chunk}</ul>,
                  li: (chunk) => <li>{chunk}</li>,
                })}
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "delivery"}
            onChange={handleChange("delivery")}
          >
            <AccordionSummary expandIcon={<PlusIcon />}>
              <Typography>{t.delivery("title")}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" component="div">
                {t.delivery.rich("text", {
                  br: () => <br />,
                  strong: (chunk) => <strong>{chunk}</strong>,
                  ul: (chunk) => <ul>{chunk}</ul>,
                  li: (chunk) => <li>{chunk}</li>,
                })}
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "minimal"}
            onChange={handleChange("minimal")}
          >
            <AccordionSummary expandIcon={<PlusIcon />}>
              <Typography>{t.minimal("title")}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" component="div">
                {t.minimal.rich("text", {
                  ...(firstOrder ? { firstOrder } : {}),
                  br: () => <br />,
                  strong: (chunk) => <strong>{chunk}</strong>,
                  ul: (chunk) => <ul>{chunk}</ul>,
                  li: (chunk) => <li>{chunk}</li>,
                })}
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "cut"}
            onChange={handleChange("cut")}
          >
            <AccordionSummary expandIcon={<PlusIcon />}>
              <Typography>{t.cut("title")}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" component="div">
                {t.cut.rich("text", {
                  br: () => <br />,
                  strong: (chunk) => <strong>{chunk}</strong>,
                  ul: (chunk) => <ul>{chunk}</ul>,
                  li: (chunk) => <li>{chunk}</li>,
                })}
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "defects"}
            onChange={handleChange("defects")}
          >
            <AccordionSummary expandIcon={<PlusIcon />}>
              <Typography>{t.defects("title")}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" component="div">
                {t.defects.rich("text", {
                  br: () => <br />,
                  strong: (chunk) => <strong>{chunk}</strong>,
                  ul: (chunk) => <ul>{chunk}</ul>,
                  li: (chunk) => <li>{chunk}</li>,
                })}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>

      <Track eventName={events.faqPage.shown} />
    </Box>
  );
}

export default FAQ;
