export const call = async (url, data) => {
    const response = await fetch('/api' + url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    });
    const result = await response.json();
    if (result.success === true) {
        return result;
    }
    throw result;
}
