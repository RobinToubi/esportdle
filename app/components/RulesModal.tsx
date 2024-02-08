"use client";

import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { Box, Button, Checkbox, FormControlLabel } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  maxHeight: "60%",
  overflowY: "scroll",
  bgcolor: "#525252",
  border: "2px solid #000",
  display: "flex",
  flexDirection: "column",
  rowGap: 2,
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
};

export const RulesModal = (): JSX.Element => {
  const [help, setHelp] = useState<boolean>(true);

  useEffect(() => {
    // Récupérer les données du localStorage lors du rendu initial du composant
    const storedValue = localStorage.getItem("disableHints");
    if (storedValue) {
      setHelp(JSON.parse(storedValue));
      setOpen(!JSON.parse(storedValue));
    }
  }, []);

  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const saveToLocalStorage = (value: boolean) => {
    setHelp(value);
    localStorage.setItem('disableHints', value.toString())
  }

  return (
    <>
      <Button
        type="button"
        onClick={handleOpen}
        variant="text"
        sx={{
          position: "absolute",
          left: 10,
          top: 10,
          fontSize: 3,
          color: "white",
        }}
      >
        <HelpIcon fontSize="large" />
      </Button>
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <h1 style={{ textAlign: "center" }}>How to play LOLESPORTDLE</h1>
          <h3>Principles</h3>
          <p>
            Each day*, you have seven tries to find the daily player**. For each
            try, the game gives you hints to help you.
          </p>
          <h3 style={{ marginTop: 10 }}>Understand the result panel</h3>
          <p>
            For each player&apos;s selection, you will see a line on the table
            representing how close you are from the result. If you hover a table
            cell, you&apos;ll have some informations about your result.
          </p>
          <section
            style={{ display: "flex", flexDirection: "column", marginLeft: 10 }}
          >
            <div style={{ display: "inline-flex" }}>
              <span
                style={{
                  backgroundColor: "red",
                  width: 16,
                  height: 16,
                  display: "block",
                  borderRadius: 5,
                  marginRight: 2,
                }}
              ></span>
              Wrong value
            </div>
            <div style={{ display: "inline-flex" }}>
              <span
                style={{
                  backgroundColor: "orange",
                  width: 16,
                  height: 16,
                  display: "block",
                  borderRadius: 5,
                  marginRight: 2,
                }}
              ></span>
              Current value is close to the answer
            </div>
            <div style={{ display: "inline-flex" }}>
              <span
                style={{
                  backgroundColor: "green",
                  width: 16,
                  height: 16,
                  display: "block",
                  borderRadius: 5,
                  marginRight: 2,
                }}
              ></span>
              Correct value
            </div>
          </section>
          <p style={{ fontStyle: "italic" }}>
          *The game resets every day at 12:00am CET. <br />
            **The playerbase includes only major league players (LEC, LCK, LCS,
            LPL).
          </p>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <FormControlLabel
              label="Hide tips on startup"
              control={
                <Checkbox
                  size="small"
                  checked={help}
                  style={{color: "white" }}
                  onChange={(e) => {
                    saveToLocalStorage(e.currentTarget.checked);
                  }}
                ></Checkbox>
              }
            ></FormControlLabel>
            <Button
              variant="contained"
              color={"primary"}
              sx={{backgroundColor: 'grey', ":hover": {color: 'grey', backgroundColor: 'white'}}}
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
