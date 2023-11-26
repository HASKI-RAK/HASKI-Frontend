import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CollapsibleText from './CollapsibleText';
import '@testing-library/jest-dom';

describe('CollapsibleText Component', () => {
    const testId = 'CollapsibleText';
    const testProps = {
        header: 'Test Header',
        body: 'Test Body',
    };

    it('should render without errors', () => {
        render(<CollapsibleText {...testProps} />);
        expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it('should display the correct header', () => {
        render(<CollapsibleText {...testProps} />);
        expect(screen.getByText(testProps.header)).toBeInTheDocument();
    });

    it('should be expandable when body is present', () => {
        render(<CollapsibleText {...testProps} />);
        const expandIcon = screen.getByTestId(testId).querySelector('svg');
        expect(expandIcon).toBeInTheDocument();

        // Check if clicking on the header expands the body
        fireEvent.click(screen.getByText(testProps.header));
        expect(screen.getByText(testProps.body)).toBeInTheDocument();
    });

    it('should not be expandable when body is not present', () => {
        render(<CollapsibleText header={testProps.header} />);
        const expandIcon = screen.getByTestId(testId).querySelector('svg');
        expect(expandIcon).not.toBeInTheDocument();
    });

    it('should display the correct body text if set as prop', () => {
        render(<CollapsibleText {...testProps} />);
        fireEvent.click(screen.getByTestId(testId)); // Expand the accordion
        expect(screen.getByText(testProps.body)).toBeInTheDocument();
    });
});
