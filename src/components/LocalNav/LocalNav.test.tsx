import "@testing-library/jest-dom";
import {fireEvent, render} from "@testing-library/react";
import LocalNav from "./LocalNav";
import {Topic} from "../../common/services/topic/RequestResponse";
import {LearningElement, LearningPath} from "../../common/services/learningPath/RequestResponse";
import * as router from "react-router";

const navigate = jest.fn();

describe("LocalNav", () => {

  beforeEach(() => {
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
  });

  it("should render the LocalNav", () => {
    const loading = false;
    const topics: Topic[]= [];
    const learningElementPath: LearningPath[] = [];

    const result = render(<LocalNav loading={loading} topics={topics} learningElementPath={learningElementPath}/>);
    expect(result).toBeTruthy();
  });

  it("should render the LocalNav with loading", () => {
    const loading = true;
    const topics: Topic[]= [];
    const learningElementPath: LearningPath[] = [];

    const result = render(<LocalNav loading={loading} topics={topics} learningElementPath={learningElementPath}/>);
    expect(result).toBeTruthy();
  });

    it("should render the LocalNav with topic and learningElementPath", () => {
    const loading = false;
      const exampleLearningElement: LearningElement = {
        activity_type: 'Quiz',
        classification: 'Formative',
        created_at: '2023-04-19T10:30:00.000Z',
        created_by: 'John Doe',
        id: 123,
        last_updated: '2023-04-20T15:45:00.000Z',
        lms_id: 456,
        name: 'Quiz on Chapter 3',
        student_learning_element: null,
        university: 'ABC University'
      };
    const topics: Topic[]= [
        {contains_le: true,
          created_at: "2021-09-01T12:00:00.000Z",
          created_by: "dimitri", id: 1,
          is_topic: true,
          last_updated: "2021-09-01T12:00:00.000Z",
          lms_id: 1,
          name: "test",
          parent_id: 1,
          student_topic:{
            done: false,
            done_at: null,
            id: 1,
            student_id: 1,
            topic_id: 1,
            visits:[]},
          university: "HS-KE"}];
    const learningElementPath: LearningPath[] = [{
      based_on: "some-Algorithm",
      calculated_on: "today",
      course_id: 1,
      id: 1,
      path: [{
        id: 1,
        learning_element: exampleLearningElement,
        learning_element_id: 1,
        learning_path_id: 1,
        position: 1,
        recommended: true}]
    }];

    const result = render(<LocalNav loading={loading} topics={topics} learningElementPath={learningElementPath}/>);
    expect(result).toBeTruthy();
    });

    it("should render LocalNav and click navigates to LearningElement URL", () => {
      const loading = false;
      const exampleLearningElement: LearningElement = {
        activity_type: 'Quiz',
        classification: 'Formative',
        created_at: '2023-04-19T10:30:00.000Z',
        created_by: 'John Doe',
        id: 123,
        last_updated: '2023-04-20T15:45:00.000Z',
        lms_id: 456,
        name: 'Quiz on Chapter 3',
        student_learning_element: null,
        university: 'ABC University'
      };
      const topics: Topic[]= [
        {contains_le: true,
          created_at: "2021-09-01T12:00:00.000Z",
          created_by: "dimitri", id: 1,
          is_topic: true,
          last_updated: "2021-09-01T12:00:00.000Z",
          lms_id: 1,
          name: "test",
          parent_id: 1,
          student_topic:{
            done: false,
            done_at: null,
            id: 1,
            student_id: 1,
            topic_id: 1,
            visits:[]},
          university: "HS-KE"}];
      const learningElementPath: LearningPath[] = [{
        based_on: "some-Algorithm",
        calculated_on: "today",
        course_id: 1,
        id: 1,
        path: [{
          id: 1,
          learning_element: exampleLearningElement,
          learning_element_id: 1,
          learning_path_id: 1,
          position: 1,
          recommended: true}]
      }];

      const {getByText} = render(<LocalNav loading={loading} topics={topics} learningElementPath={learningElementPath}/>);
      fireEvent.click(getByText("1 Quiz on Chapter 3"));

      expect(navigate).toHaveBeenCalledWith("/topics/test/Quiz on Chapter 3");
    });
});
