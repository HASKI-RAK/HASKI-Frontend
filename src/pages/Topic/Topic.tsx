import { Box, Card, Modal } from "@mui/material";
import log from "loglevel";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const style = {
  position: "absolute",
  top: "25%",
  left: "25%",
  transform: "translate(-20%, -20%)",
  width: "75%",
  height: "85%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "hidden",
};

const design_patterns_general = [
  {
    name: "Kurzübersicht",
    link: "fakedomain.com/",
    description: "Kurzübersicht über die wichtigsten Design Patterns",
    tags: ["general", "overview"],
    type: "text",
  },
  {
    name: "Selbsteinschätzungstest",
    link: "http://fakedomain.com/mod/quiz/view.php?id=5",
    description: "Selbsteinschätzungstest für Design Patterns",
    tags: ["general", "test"],
    type: "quiz",
  },
];

const IframeModal = ({
  url,
  title,
  isOpen,
  onClose,
}: {
  url: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}): JSX.Element => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={style}>
        <iframe
          src={url}
          title={title}
          width="120%"
          height="130%"
          style={{
            position: "relative",
            left: "-19%",
            top: "-21%",
          }}
        />
      </Box>
    </Modal>
  );
};
export const Topic = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const { t } = useTranslation();

  log.setLevel("error");
  return (
    <>
      {design_patterns_general.map((item) => (
        <Card
          key={item.name}
          sx={{ p: 2, m: 2 }}
          onClick={() => {
            setIsOpen(true);
            setUrl(item.link);
            setTitle(item.name);
          }}
        >
          <h2>{item.name}</h2>
          <p>{item.description}</p>
        </Card>
      ))}
      <IframeModal
        url={url}
        title={title}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

export default Topic;
