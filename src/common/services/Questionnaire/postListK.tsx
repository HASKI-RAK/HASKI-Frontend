import log from 'loglevel';

interface PostListKProps {
    studentId: number;
    outputJson: string;
}

export const postListK = async ({ studentId, outputJson }: PostListKProps): Promise<string> => {
    try {
        const response = await fetch(`${process.env.BACKEND}/lms/student/${studentId}/questionnaire/listk`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: outputJson,
        });

        if (response.ok) {
            return await response.json();
        } else {
            // have to throw an error to test the catch block
            throw new Error('ListK Questionnaire Answers: post-fetch failed');
        }
    } catch (error) {
        log.error(error);
        throw error;
    }
};