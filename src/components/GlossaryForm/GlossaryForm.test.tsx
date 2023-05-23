import React from 'react';
import { render, screen } from '@testing-library/react';
import GlossaryForm from './GlossaryForm';

describe('GlossaryForm', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<GlossaryForm />);

        screen.debug();
        
    });
});