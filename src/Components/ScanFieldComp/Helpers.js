export const validateTIN = (TIN) => {
    let TINValid = false;
    let TINError = '';

    if (TIN === null || !TIN.length) {
        TINError = 'Введите ИНН';
        return { TINValid, TINError };
    } else if (/[^0-9]/.test(TIN)) {
        TINError = 'ИНН может состоять только из цифр';
        return { TINValid, TINError };
    } else if ([10, 12].indexOf(TIN.length) === -1) {
        TINError = 'ИНН может состоять только из 10 или 12 цифр';
        return { TINValid, TINError };
    } else {
        const checkDigit = (TIN, ratios) => {
            let d = 0;
            for (let i in ratios) {
                d += ratios[i] * TIN[i];
            }
            return parseInt(d % 11 % 10);
        };
        switch (TIN.length) {
            case 10:
                const d10 = checkDigit(TIN, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
                if (d10 === parseInt(TIN[9])) {
                    TINValid = true;
                }
                break;
            case 12:
                const d11 = checkDigit(TIN, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
                const d12 = checkDigit(TIN, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
                if ((d11 === parseInt(TIN[10])) && (d12 === parseInt(TIN[11]))) {
                    TINValid = true;
                }
                break;
            default: 
                TINValid = false;
                TINError = 'Введите корректный ИНН';
        }
        if (!TINValid) {
            TINError = 'Неправильное контрольное число';
        }
    }
    return { TINValid, TINError };
}

export const validateDocumentQuantity = (documentQuantity) => {
    let DocumentQuantityValid = false;
    let DocumentQuantityError = '';

    if (documentQuantity === undefined || documentQuantity === null || documentQuantity.toString().length === 0) {
        DocumentQuantityError = 'Обязательное поле';
        return { DocumentQuantityValid, DocumentQuantityError };
    } else if (documentQuantity < 1 || documentQuantity > 1000) {
        DocumentQuantityError = 'Число вне диапозона';
        return { DocumentQuantityValid, DocumentQuantityError };
    } else {
        DocumentQuantityValid = true;
        return { DocumentQuantityValid, DocumentQuantityError };
    }
}

export const validateDates = (firstDate, lastDate) => {
    let DatesValid = false;
    let DatesError = '';
    let currentDate = new Date();

    currentDate.setHours(0,0,0,0);

    if (!firstDate || !lastDate) {
        DatesError = 'Укажите необходимые даты';
        return { DatesValid, DatesError };
    } else {
        firstDate.setHours(0,0,0,0);
        lastDate.setHours(0,0,0,0);
        if (firstDate > lastDate) {
            DatesError = 'Дата начала не может быть позднее даты конца';
            return { DatesValid, DatesError };
        } else if (firstDate > currentDate) {
            DatesError = 'Дата начала не может быть позднее текущей даты';
            return { DatesValid, DatesError };
        } else if (lastDate> currentDate) {
            DatesError = 'Дата конца не может быть позднее текущей даты';
            return { DatesValid, DatesError };
        } else {
            DatesValid = true;
            return { DatesValid, DatesError };
        }
    }

}