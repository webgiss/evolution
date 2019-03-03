class ConfigDao {
    constructor() {
        this._config = {
            useDebug: false,
        };
    }
    
    get config() {
        return this._config;
    }
}

export default new ConfigDao();
