import registerServiceWorker from '../registerServiceWorker';

export default class ServiceWorkerService {
    constructor(reactReduxInit) {
        reactReduxInit.addProvider(this);
    }

    onInit() {
        registerServiceWorker();
    }
}

