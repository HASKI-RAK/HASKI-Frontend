type ilsCharacteristics = {
    characteristicID: number
    id: number
    inputDimension: string
    inputValue: number
    perceptionDimension: string
    perceptionValue: number
    processingDimension: string
    processingValue: number
    understandingDimension: string
    understandingValue: number
}

type characteristics = {
    characteristicID: number
    id: number
}

type learningCharacteristics = {
    id: number;
    knowledge: characteristics
    learningAnalytics: characteristics
    learningStrategy: characteristics
    learningStyle: ilsCharacteristics
    studentID: number
}

type RequestResponse = {
    status: number
    message: string
    data: learningCharacteristics
}

export type { RequestResponse as LearningCharacteristicsILSResponse, learningCharacteristics, characteristics, ilsCharacteristics }