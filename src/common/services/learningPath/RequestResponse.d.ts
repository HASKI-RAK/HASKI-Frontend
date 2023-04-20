type LearningElement = {
    activity_type: string;
    classification: string;
    created_at: string;
    created_by: string;
    id: number;
    last_updated: string | null;
    lms_id: number;
    name: string;
    student_learning_element: null;
    university: string;
}

type PathItem = {
    id: number;
    learning_element: LearningElement;
    learning_element_id: number;
    learning_path_id: number;
    position: number;
    recommended: boolean;
}

type LearningPath = {
    based_on: string;
    calculated_on: string | null;
    course_id: number;
    id: number;
    path: PathItem[];
}

export type RequestResponse = {
    status: number;
    message: string;
    data: LearningPath;
};