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

export const updateUserRequest = async (data) => {
    try {
        const { id, password, ...other } = data;
        const res = await instance.put(`/api/user/${id}`, other);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const forgotPasswordRequest = async (data) => {
    const { username, email } = data;
    console.log(data);
    try {
        const res = await instance.post(`api/user/forgot-password`, { username, email });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const updateAvatarRequest = async (data) => {
    const { id, formData } = data;
    console.log(id, formData);
    try {
        const res = await instance.put(`api/user/avatar/${id}`, formData);
        return res;
    } catch (error) {
        console.log(error);
    }
};
