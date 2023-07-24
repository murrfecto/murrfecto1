import {Alert, Collapse} from "@mui/material";
import React, {useState} from "react";

export const HandleAlerts = (status, values) => {
    const [open, setOpen] = useState(true);

    if (status && status.status === 'success') {
        return (
            <Collapse in={open}>
            <Alert className={'alert-success'} severity={'success'}>
                Картка створена | оновлена!
            </Alert>
            </Collapse>
        );
    } else if (status && status.status === 'error') {
        return (
            <Collapse in={open}>
            <Alert className={'alert-failure'} severity={'error'}>
                Помилка створення картки, будь ласка оберіть доступний формат
                P.S: Вага картинок не може перевищувати 1 мб
            </Alert>
            </Collapse>
        );
    } else if (values.images.length === 0) {
        return (
                    <Collapse in={open}>
            <Alert className={'alert-failure'} severity={'error'}>
                Будь ласка, додайте картинки
            </Alert>
                    </Collapse>
        );
    }
    return null;
}
