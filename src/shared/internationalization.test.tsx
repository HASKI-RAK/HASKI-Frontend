//Local Storage should be changed before importing i18n config file.
//That way we can access the else statement in the i18n config file.
localStorage.setItem("i18nextLng", "en");

import React from 'react';
import { act, render } from "@testing-library/react";
import { DefaultSelect as Select } from "@common/components";
import { MenuItem } from "@mui/material";
import i18next from './internationalization' // your i18n config file
import { I18nextProvider, useTranslation } from 'react-i18next'


const ArrangeElement = () => {
    jest.unmock('./internationalization');
    jest.unmock('react-i18next');
    const { i18n } = useTranslation();
    const startingLanguage = localStorage.getItem("i18nextLng") as string;

    const onClickLanguageChange = (e: { target: { value: string }; }) => {
        i18n.changeLanguage(e.target.value);
        localStorage.setItem("i18nextLng", e.target.value);
    }

    return (
        <div>
            <Select className="LanguageDropdown"
                autoWidth={true}
                defaultValue={startingLanguage}
                onChange={onClickLanguageChange}
            >
                <MenuItem value="de">Deutsch</MenuItem>
                <MenuItem value="en">English</MenuItem>
            </Select>
        </div>
    )
};



test("language can be changed", () => {
    render(
        <I18nextProvider i18n={i18next}> // actually give translation to your component
            <ArrangeElement />
        </I18nextProvider>
    );
    // example if you have a key called example
    act(() => {
        i18next.changeLanguage("de");
    })
    expect(i18next.language).toBe("de");

    act(() => {
        i18next.changeLanguage("en");
    })

    expect(i18next.language).toBe("en");
});

test("language can be changed", () => {

    localStorage.setItem("i18nextLng", "en");

    render(
        <I18nextProvider i18n={i18next}> // actually give translation to your component
            <ArrangeElement />
        </I18nextProvider>
    );
    // example if you have a key called example

    expect(i18next.language).toBe("en");
});


