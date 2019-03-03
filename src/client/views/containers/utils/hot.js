import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';

export default (mod, mapStateToProps, mapDispatchToProps, component) => {
    return hot(mod)(connect(mapStateToProps, mapDispatchToProps)(component));
}
