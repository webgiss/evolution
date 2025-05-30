export const getOnClick = (dispatch, onClick) => {
    return (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(onClick());
    };
}