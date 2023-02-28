import instance from './instance';

export const loginUserRequest = async (user) => {
    try {
        const res = await instance.post('/api/auth/signin', user);
        return res;
    } catch (err) {}
};

export const registerUserRequest = async (user) => {
    try {
        const res = await instance.post('/api/auth/signup', user);
        return res;
    } catch (err) {}
};
