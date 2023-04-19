import { TopicLearningElements, LearningElement } from "@core/*";
import { Box, Card, Modal } from "@mui/material";
import log from "loglevel";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
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
const learning_path: TopicLearningElements[] = [
  {
    position: 1,
    learning_element: {
      id: 1,
      lms_id: 1,
      activity_type: "Quiz",
      classification: "RQ",
      name: "Test Learning Element 1",
      done: false,
      done_at: "2017-07-21T17:32:28Z",
      nr_of_visits: 3,
      last_visit: "2017-07-21T17:32:28Z",
      time_spend: 123.45,
      is_recommended: true,
    },
  },
  {
    position: 2,
    learning_element: {
      id: 2,
      lms_id: 5,
      activity_type: "Quiz",
      classification: "RQ",
      name: "Test Learning Element 5",
      done: false,
      done_at: "2017-07-21T17:32:28Z",
      nr_of_visits: 0,
      last_visit: "2017-07-21T17:32:28Z",
      time_spend: 123.45,
      is_recommended: true,
    },
  },
  {
    position: 2,
    learning_element: {
      id: 2,
      lms_id: 3,
      activity_type: "Quiz",
      classification: "RQ",
      name: "Test Learning Element 3",
      done: false,
      done_at: "2017-07-21T17:32:28Z",
      nr_of_visits: 20,
      last_visit: "2017-07-21T17:32:28Z",
      time_spend: 1000,
      is_recommended: true,
    },
  },
];
const _useTopic = () => {
  const [learning_path, setLearningPath] = useState([]);
  const [searchParams] = useSearchParams();
  const topic = searchParams.get("topic");

  useEffect(() => {
    if (topic) {
      // request to backend to get learning path for topic
      alert("Topic: " + topic);
      const lp = map_TopicLearningElements_to_reactflow(learning_path);
      setLearningPath(lp);
    }
  }, [topic]);

  return { topic };
};

type TopicProps = {
  useTopic?: typeof _useTopic;
};

export const Topic = ({ useTopic = _useTopic }: TopicProps): JSX.Element => {
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

const map_TopicLearningElements_to_reactflow = (
  learning_path: TopicLearningElements[]
) => {
  alert("map_TopicLearningElements_to_reactflow");
  return learning_path.map((item) => item.learning_element);
};
