import { useTranslation } from "react-i18next";
import { DefaultSelect as Select } from "@common/components";
import {MenuItem} from "@mui/material";

export const DropdownLanguage = () => {

    const { i18n } = useTranslation();
    const startingLanguage = localStorage.getItem("i18nextLng") as string;

    const onClickLanguageChange = (e: { target: { value: string }; }) => {
        i18n.changeLanguage(e.target.value);
        localStorage.setItem("i18nextLng", e.target.value);
    };

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
    /*The display-text is only an example to show how the internationalization works*/
};
