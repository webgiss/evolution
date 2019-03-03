import configDao from '../dao/config';

export default (...params) => {
    if (configDao.debug) {
        console.log(...params);
    }
};