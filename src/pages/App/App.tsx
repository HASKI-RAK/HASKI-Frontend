import { ThemeProvider } from "@mui/material";
import { Home, ThemePresentation } from "@pages";
import { Theme } from "@utils";
import { Routes } from "react-router";
import { BrowserRouter as Router, Route } from "react-router-dom";
import log from "loglevel";
import {RingBuffer} from "../../shared/RingBuffer";

function App() {

    const GlobalRingBuffer = new RingBuffer<[string, string]>(100);
    if(localStorage.getItem('ringBufferContent') !== null){
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore - localStorage.getItem('ringBufferContent') is not null
        const localStorageRingBuffer = JSON.parse(localStorage.getItem('ringBufferContent'));
        GlobalRingBuffer.fromArray(localStorageRingBuffer.buffer)
    }
    else{
        localStorage.setItem('ringBufferContent', JSON.stringify(GlobalRingBuffer));
    }

    const originalFactory = log.methodFactory;
    log.methodFactory = function (methodName, logLevel, loggerName) {
        const rawMethod = originalFactory(methodName, logLevel, loggerName);

        return function (message) {
            //show only warnings and error in console and log everything else in the GlobalRingBuffer?
            if(methodName==="warn" || methodName==="error"){
                rawMethod(message);
                console.log(GlobalRingBuffer);
            }
            GlobalRingBuffer.add([(new Date()).toUTCString(), message]);
            localStorage.setItem('ringBufferContent', JSON.stringify(GlobalRingBuffer));
        };
    };

  return (
    <ThemeProvider theme={Theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/theme" element={<ThemePresentation />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
export default App;
