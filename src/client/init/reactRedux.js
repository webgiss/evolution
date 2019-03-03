import exportValues from '../utils/exportValues';

class ReactReduxInit {
    constructor(initView, initRedux) {
        this._providers = [];
        this._unsubscribe = undefined;
        this._reducer = undefined;
        this._rootElement = undefined;
        this._baseUrl = undefined;
        this._routes = undefined;
        this._initView = initView;
        this._initRedux = initRedux;
        this._stateRegistrations = [];
    }

    addProvider(provider) {
        this._providers.push(provider);
    }

    set reducer(data) { this._reducer = data; }
    set rootElement(data) { this._rootElement = data; }
    set baseUrl(data) { this._baseUrl = data; }
    set routes(data) { this._routes = data; }
    set store(data) { this._store = data; }
    get store() { return this._store; }

    registerStateChange(name, getStateValue, onNewValue) {
        let stateRegistration = {
            name,
            getStateValue,
            onNewValue,
            currentValue: undefined,
        };
        this._stateRegistrations.push(stateRegistration);
    }

    init() {
        let initialState = undefined;

        this._providers.forEach(provider => {
            if (provider.onInitialState !== undefined) {
                initialState = provider.onInitialState(initialState);
            }
        });

        let { history, store } = this._initRedux(this._baseUrl, initialState, this._reducer);
        this.store = store;

        let dispatch = store.dispatch;
        let subscribeParams = { dispatch, store, history };

        this._providers.forEach(provider => {
            if (provider.onStartApplication !== undefined) {
                initialState = provider.onStartApplication(subscribeParams);
            }
        });

        exportValues(subscribeParams);

        let subscribeProviders = this._providers.filter(provider => provider.onNewState !== undefined);
        let changeManagerProviders = this._providers.filter(provider => provider.changeManager !== undefined);

        if (changeManagerProviders.length > 0) {
            changeManagerProviders.forEach(provider => {
                provider.changeManager().forEach(changeManager => {
                    this.registerStateChange(
                        changeManager.name,
                        (state) => changeManager.getValue(state),
                        (currentValue, previousValue, currentState, subscribeParams) => changeManager.onNewValue(currentValue, previousValue, currentState, subscribeParams)
                    );
                })
            });
        }

        if (subscribeProviders.length > 0 || this._stateRegistrations.length > 0) {
            let currentState = undefined;
            let stateRegistrations = this._stateRegistrations;

            exportValues({ stateRegistrations });

            this._unsubscribe = store.subscribe(() => {
                let previousState = currentState;
                currentState = store.getState();

                stateRegistrations.forEach(stateRegistration => {
                    let previousValue = stateRegistration.currentValue;
                    stateRegistration.currentValue = stateRegistration.getStateValue(currentState);
                    if (stateRegistration.currentValue !== previousValue) {
                        stateRegistration.onNewValue(stateRegistration.currentValue, previousValue, currentState, subscribeParams);
                    }
                });

                if (previousState !== currentState) {
                    subscribeProviders.map(provider => provider.onNewState(currentState, subscribeParams));
                }
            });
        }

        this._initView(store, history, this._rootElement, this._routes);

        this._providers.forEach(provider => {
            if (provider.onInit !== undefined) {
                provider.onInit();
            }
        });
    }

    dispose() {
        if (this._unsubscribe !== undefined) {
            this._unsubscribe();
            this._unsubscribe = undefined;
        }
    }
}

export default ReactReduxInit;


