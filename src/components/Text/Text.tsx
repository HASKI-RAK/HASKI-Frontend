import {useTranslation} from "react-i18next";
import log from "loglevel";
import { RingBuffer } from "../../shared/RingBuffer";

export const Text = () => {

    const {t, i18n} = useTranslation();
    log.trace("this is a trace");
    log.warn("what is happening here?");
    log.error("text could not be shown");
    const ring = new RingBuffer<[Date,string]>(5);

    ring.add([new Date(),"test1"]);
    ring.add([new Date(),"test2"]);
    ring.add([new Date(),"test3"]);
    ring.add([new Date(),"test4"]);
    ring.add([new Date(),"test5"]);
    ring.add([new Date(),"test6"]);
    ring.add([new Date(),"test7"]);

    console.log(ring.toArray())

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
