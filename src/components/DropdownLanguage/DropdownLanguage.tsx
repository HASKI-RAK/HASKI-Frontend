import {useTranslation} from "react-i18next";
import { DefaultSelect as Select } from "@common/components";
import {MenuItem} from "@mui/material";
import "../../shared/internationalization";
import log from "loglevel";


export const DropdownLanguage = () => {

    log.setLevel("error");
    const {i18n} = useTranslation();
    const startingLanguage = localStorage.getItem("i18nextLng") as string;
    function onClickLanguageChange(e: { target: { value: string }; }) {
        try {
            i18n.changeLanguage(e.target.value);
            localStorage.setItem("i18nextLng", e.target.value);
            log.trace("The language was changed to: " + e.target.value);
        }
        catch(e: unknown){
            log.error("The language could not be changed. Error Message: "+e);
        }
    }

    
    return(
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
