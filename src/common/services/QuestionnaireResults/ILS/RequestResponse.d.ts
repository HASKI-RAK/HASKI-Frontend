type ilsCharacteristics = {
    characteristic_id: number
    id: number
    input_dimension: string
    input_value: number
    perception_dimension: string
    perception_value: number
    processing_dimension: string
    processing_value: number
    understanding_dimension: string
    understanding_value: number
}

type characteristics = {
    characteristic_id: number
    id: number
}

type learningCharacteristics = {
    id: number;
    knowledge: characteristics
    learning_analytics: characteristics
    learning_strategy: characteristics
    learning_style: ilsCharacteristics
    student_id: number
}

type RequestResponse = {
    status: number
    message: string
    data: learningCharacteristics
}

export type { RequestResponse as LearningCharacteristicsILSResponse, learningCharacteristics, characteristics, ilsCharacteristics }