export const validateLogin = (login) => {
    if (login.startsWith('+')) {
        const re = /^\+[0-9]{1,3}?[- .]?(\(?[0-9]{3}\)?[- .]?[0-9]{3}[- .]?[0-9]{2}[- .]?[0-9]{2})$/;
        return re.test(login);
    } else {
        const re = /^[a-zA-Z0-9.,@-_]*$/;
        return re.test(login);
    }
};

