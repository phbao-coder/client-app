import instance from './instance';

export const getProduct = (url) => {
    const data = instance
        .get(url)
        .then((res) => res.json())
        .then((json) => JSON.parse(json))
        .catch((err) => console.log(err));
    return data;
};
