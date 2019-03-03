import configDao from '../dao/config';

export default (params) => {
    if (configDao.debug) {
        window.rr = { ...(window.rr||{}), ...params };
    }
}
