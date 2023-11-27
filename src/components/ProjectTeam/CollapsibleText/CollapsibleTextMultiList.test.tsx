import React from 'react';
import {render, screen} from '@testing-library/react';
import CollapsibleTextMultiList from './CollapsibleTextMultiList';
import '@testing-library/jest-dom';

describe('CollapsibleTextMultiList Component', () => {
    const testId = 'CollapsibleTextMultiList';
    const testIdChild = 'CollapsibleTextList';
    const testProps = {
        content: {
            'Header 1': 'Body 1',
            'Header 2': 'Body 2',
            'Header 3': 'Body 3',
            'Header 4': 'Body 4',
            'Header 5': 'Body 5',
        },
        columns: 2,
    };

    it('should render without errors', () => {
        render(<CollapsibleTextMultiList {...testProps} />);
        expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it('should display correct headers and bodies in multiple columns', () => {
        const {content, columns} = testProps;
        Object.entries(content).forEach(([header, body]) => {
            render(<CollapsibleTextMultiList content={{[header]: body}} columns={columns}/>);
            expect(screen.getByText(header)).toBeInTheDocument();
            expect(screen.getByText(body)).toBeInTheDocument();
        });
    });

    it.each([1, 2, 3])('should render n CollapsibleTextList columns', (columns) => {
        render(<CollapsibleTextMultiList {...{...testProps, columns}} />);
        const column = screen.queryAllByTestId(testIdChild);
        expect(column).toHaveLength(columns);
    });
});
