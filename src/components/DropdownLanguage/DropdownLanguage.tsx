import { useTranslation } from "react-i18next";
import { DefaultSelect as Select } from "@common/components";
import { MenuItem } from "@mui/material";
import log from "loglevel";

/**
 * DropdownLanguage is a dropdown menu that allows the user to change the language of the application.
 * 
 * @remarks
 * The language is stored in the local storage and is used to set the language of the application.
 * 
 * @returns {JSX.Element} - The DropdownLanguage component.
 */
export const DropdownLanguage = () => {

    log.setLevel("error");
    const { i18n } = useTranslation();
    const startingLanguage = localStorage.getItem("i18nextLng") as string;
    const onClickLanguageChange = (e: { target: { value: string }; }) => {
        try {
            i18n.changeLanguage(e.target.value);
            log.trace("The language was changed to: " + e.target.value);
            localStorage.setItem("i18nextLng", e.target.value);
        }
        catch (e: unknown) {
            log.error("The language could not be changed. Error Message: " + e);
        }
    }


    return (
        <div>
            <Select className="LanguageDropdown"
                autoWidth={true}
                value={startingLanguage}
                inputProps={{ "data-testid": "LanguageDropdown" }}
                onChange={onClickLanguageChange}
            >
                <MenuItem value="de">Deutsch</MenuItem>
                <MenuItem value="en">English</MenuItem>
            </Select>
        </div>
    )
};
