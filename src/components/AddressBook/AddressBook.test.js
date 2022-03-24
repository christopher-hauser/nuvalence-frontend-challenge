import React from "react";
import { render, fireEvent, queryByPlaceholderText } from '@testing-library/react';
import AddressBook from "./AddressBook";

// Test Search Bar
describe("Search", () => {
    it("renders correctly", () => {
        const { queryByPlaceholderText } = render(<AddressBook />);
        expect(queryByPlaceholderText('Search . . .')).toBeTruthy();

    })
    it("updates on change", () => {
        const { queryByPlaceholderText } = render(<AddressBook />)

        const searchInput = queryByPlaceholderText('Search . . .');

        fireEvent.change(searchInput, { target: { value: 'test' } })

        expect(searchInput.value).toBe('test')
    })
})
