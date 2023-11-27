import React from 'react';
import {render, screen} from '@testing-library/react';
import CollapsibleTextList from './CollapsibleTextList';
import '@testing-library/jest-dom';

describe('CollapsibleTextList Component', () => {
    const testId = 'CollapsibleTextList';
    const testProps = {
        content: {
            'Header 1': 'Body 1',
            'Header 2': 'Body 2',
            'Header 3': 'Body 3',
        },
    };

    it('should render without errors', () => {
        render(<CollapsibleTextList {...testProps} />);
        expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it('should display correct headers and bodies', () => {
        render(<CollapsibleTextList {...testProps} />);

        for (const [header, body] of Object.entries(testProps.content)) {
            expect(screen.getByText(header)).toBeInTheDocument();
            expect(screen.getByText(body)).toBeInTheDocument();
        }
    });
});
