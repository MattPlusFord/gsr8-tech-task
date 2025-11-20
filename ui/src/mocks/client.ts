import {StartOptions} from "msw";

export function initialiseMocks({delay, ...options}: {delay?: number} & StartOptions) {
    return import("./browser")
        .then(({getWorker}) => getWorker().start(options))
        .then(() => new Promise((resolve) => setTimeout(resolve, delay)));
}
