interface ListenersMap {
    [id: string]: Array<(...params: any[]) => void>;
}

const EVENT_NAME = "FOREGROUND_LISTENER"

const listenersMap: ListenersMap = {};

function addListener(listener: (...params: any[]) => void) {
    if (typeof listener !== "function") {
        throw new Error("Invalid arguments for addListener");
    }

    listenersMap[EVENT_NAME] = listenersMap[EVENT_NAME] || [];
    listenersMap[EVENT_NAME].push(listener);
}

function removeListener(listener: (...params: any[]) => void) {
    if (typeof listener !== "function") {
        throw new Error("Invalid arguments for removeListener");
    }

    let lis = listenersMap[EVENT_NAME];
    if (!lis) return;

    for (let i = lis.length - 1; i >= 0; i--) {
        if (lis[i] === listener) {
            lis.splice(i, 1);
            break;
        }
    }
}

function removeAllListeners() {
    listenersMap[EVENT_NAME] = [];
}

function notify<T = any>(...params: T[]) {
    let listeners = listenersMap[EVENT_NAME];
    if (!listeners) return false;
    console.log("listeners", listeners.length)
    listeners.forEach(fnc => {
        try {
            fnc(...params);
        } catch (error) {
            console.error(`Error in listener for event ${EVENT_NAME}:`, error);
        }
    });
    return true;
}

export default {
    addListener,
    removeListener,
    removeAllListeners,
    notify,
};