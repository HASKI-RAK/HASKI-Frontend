import {useTranslation} from "react-i18next";

export const Text = () => {

    const {t, i18n} = useTranslation();

    return(
        <div>
            <div>
                Current Language: {i18n.language} <br/>
                {(t("Back"))} <br/>
                {(t("Next"))} <br/>
                {(t("components.Questionnaire.QuestionnaireResults.Modal.QuestionnaireResultsModal.ButtonText"))} <br/>
            </div>
        </div>
    )
};
