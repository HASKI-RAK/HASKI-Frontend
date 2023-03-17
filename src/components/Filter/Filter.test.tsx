import "@testing-library/jest-dom";
import { Filter } from './Filter';
import { render, fireEvent } from '@testing-library/react'

describe('test Filter', () => {
    const mockFilterProps = {
        tags: ["tag 1","tag 2","tag 3", "tag 4"],
        selectedTags: ["tag 2","tag 4"],
        setSelectedTags: jest.fn()
    }

    test('renders box', () =>{
        const {getByLabelText}= render(<Filter {...mockFilterProps} />);
        const selectElement = getByLabelText(/glossary filter/i);
        expect(selectElement).toBeInTheDocument();
    })

    test('selects tags', () =>{
        const { getAllByRole } = render(<Filter {...mockFilterProps} />)
        const menuItems = getAllByRole('option')
        expect(menuItems.length).toEqual(mockFilterProps.tags.length)
    })

    test('shows the selected tags', () =>{
        const { getByLabelText, getByText } = render(<Filter {...mockFilterProps} />)
        const selectElement = getByLabelText(/glossary filter/i)
        fireEvent.mouseDown(selectElement)
        const menuItem = getByText(mockFilterProps.tags[1])
        fireEvent.click(menuItem)
        expect(mockFilterProps.setSelectedTags).toHaveBeenCalledWith([...mockFilterProps.selectedTags, mockFilterProps.tags[1]])
      })
})