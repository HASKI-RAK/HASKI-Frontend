import log from 'loglevel';

interface PostILSProps {
    studentId: number;
    outputJson: string;
}

export const postILS = async ({ studentId, outputJson }: PostILSProps): Promise<string> => {
    try {
        const response = await fetch(
            process.env.BACKEND + `/lms/student/${studentId}/questionnaire/ils`,
            {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: outputJson,
            }
        );

        if (response.ok) {
            return await response.json();
        } else {
            // have to throw an error to test the catch block
            throw new Error('ILS Questionnaire Answers: post-fetch failed');
        }
    } catch (error) {
        log.error(error);
        throw error;
    }
};