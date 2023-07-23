import {Alert} from "@mui/material";
import React from "react";

export const handleAlerts = (status, values) => {
    if (status && status.status === 'success') {
        return (
            <Alert className={'alert-failure'} severity={'success'}>
                Картка створена!
            </Alert>
        );
    } else if (status && status.status === 'error') {
        return (
            <Alert className={'alert-failure'} severity={'error'}>
                Помилка створення картки, будь ласка оберіть доступний формат
                P.S: Вага картинок не може перевищувати 1 мб
            </Alert>
        );
    } else if (values.images.length === 0) {
        return (
            <Alert className={'alert-failure'} severity={'error'}>
                Будь ласка, додайте картинки
            </Alert>
        );
    }
    return null;
}
