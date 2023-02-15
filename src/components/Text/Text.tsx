import {useTranslation} from "react-i18next";
import log from "loglevel";
import {GlobalRingBuffer} from "../../shared/RingBuffer";

export const Text = () => {

    const {t, i18n} = useTranslation();
    log.setLevel("trace");
    log.trace("this is a trace");
    //log.warn("what is happening here?");
    //log.error("text could not be shown");
    console.log(GlobalRingBuffer.toArray());
    log.traceWithRingBuffer(new Date(), "this is a trace with ring buffer");

    return(
        <div>
            <div>
                Current Language: {i18n.language} <br/>
                {(t("previousText"))} <br/>
                {(t("nextText"))} <br/>
                {(t("spellcheckText"))} <br/>
            </div>
        </div>
    )
};
