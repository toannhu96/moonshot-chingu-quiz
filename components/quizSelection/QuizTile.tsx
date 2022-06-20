import React from "react";
import Link from "next/link";
import { Heading4, TextBodySmall, TextBodyMicro } from "../shared/styles";
import { TileContainer, TileTagContainer, QuizTileTag } from "./styles";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ExploreIcon from "@mui/icons-material/Explore";
import type { ChinguQuiz } from "../../models";

interface QuizTileProps {
  quizData: ChinguQuiz.Quiz;
  animationDelay: number | string;
}

const styles = {
  box: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },
  button: {
    width: 400,
  },
};

export default function QuizTile({ quizData, animationDelay }: QuizTileProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <TileContainer onClick={handleOpen} animationDelay={animationDelay}>
        <div>
          <Heading4>{quizData.title}</Heading4>
          <TextBodySmall>{quizData.description}</TextBodySmall>
        </div>
        <TileTagContainer>
          {quizData.tag.map(tag => (
            <QuizTileTag key={tag}>
              <TextBodyMicro>{tag}</TextBodyMicro>
            </QuizTileTag>
          ))}
        </TileTagContainer>
      </TileContainer>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={styles.box}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Choose your test type
            </Typography>
            <br />
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={5}
            >
              <Link href={`/quiz/practice/${quizData.id}`}>
                <Button
                  variant="contained"
                  startIcon={<MenuBookIcon />}
                  color="primary"
                  sx={styles.button}
                >
                  Practice
                </Button>
              </Link>
              <Link href={`/quiz/test/${quizData.id}`}>
                <Button
                  variant="contained"
                  startIcon={<ExploreIcon />}
                  color="error"
                  sx={styles.button}
                >
                  Test
                </Button>
              </Link>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
