import instance from './instance';

export const loginUserRequest = async (user) => {
    try {
        const res = await instance.post('/api/auth/signin', user);
        return res;
    } catch (err) {
        console.log(err);
    }
};
export const registerUserRequest = async (user) => {
    try {
        await instance.post('/api/auth/signup', user);
    } catch (err) {
        console.log(err);
    }
};
