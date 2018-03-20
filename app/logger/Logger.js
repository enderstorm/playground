import request from 'superagent';
import { getDomPath, getMousePos } from './LoggerUtils';

const NO_VISITOR = 'no-visitor-yet';

const currentVisitorId = () =>
// window.localStorage.getItem('yeself-visitorId')
//     ? window.localStorage.getItem('yeself-visitorId')
//     : NO_VISITOR;
{
    return window.currentVisitorId;
}

const logStack = [];

let conversationId = '';

const createLogEntry = e => {
    const domPath = getDomPath(e.target);
    const time = new Date().toISOString();
    const mousePos = getMousePos(e);

    const logEntry = {
        cursorId: e.id || 0, // ??
        visitorId: currentVisitorId(),
        conversationId: conversationId,
        displayWidth: window.innerWidth,
        displayHeight: window.innerHeight,
        keyPressed: e.key || '',
        timestamp: time,
        url: window.location.href,
        xpos: mousePos.x,
        ypos: mousePos.y,
        event: e.type,
        xpath: domPath || ' ',
        attrs: 'attrs'
    };

    logStack.push(logEntry);
    return logEntry;
};

const attachEvents = (element, events, logFn) => {
    // Register ordinary events
    events.forEach(event => {
        element.addEventListener(event, logFn);
    });
};

const sendBatchToApi = apiUrl => () => {
    const batch = logStack.splice(0, logStack.length);

    if (batch.length > 0) {
        // send to API
        console.log(batch);

        request
            .post(apiUrl)
            .send(createBatch(batch))
            .then(res => console.log(res))
            .catch(err => console.error(err));
    }
};

const createBatch = (batch) => {
    return {
        data: batch
    }
}

const logger = initConfig => {
    console.log(`==> Logger: Start`);

    const config = {
        events: initConfig.events || [
            'click',
            'dblclick',
            'mousedown',
            'mousemove',
            'mousemove',
            'scroll',
            'mousewheel',
            'touchstart',
            'touchend',
            'touchmove',
            'keydown',
            'keyup',
            'keypress',
            'select',
            'submit'
        ],
        interval: initConfig.interval || 1000,
        apiUrl: initConfig.apiUrl || window.apiUrl,
        conversationId: initConfig.conversationId || 'notset',
    };

    conversationId = config.conversationId;

    console.warn(config);

    // Attach logFunction to events
    attachEvents(document, config.events, createLogEntry);
    // Register unload event
    window.addEventListener('unload', sendBatchToApi(config.apiUrl))
    /// Set interval to batch send to API
    setInterval(sendBatchToApi(config.apiUrl), config.interval);
};



export { logger };
