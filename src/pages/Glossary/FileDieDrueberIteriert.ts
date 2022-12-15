import { glossaryData } from "./test.json";

const iterateOverJSON = () => {
    for(var data in glossaryData) {
        console.log(data);
        // TODO: Hier eine Funktion in der tsx aufrufen, die ein tsx element erstellt für jedes objekt in glossaryData
    }
}

export default iterateOverJSON;