<?php
if ($formData['type'] == 1) {
    if(!$formData['name'])
        throw new Exception("Поле Наименование не должно быть пустым");
}
elseif ($formData['type'] == 2) {
    if(!$formData['name'])
        throw new Exception("Поле Наименование не должно быть пустым");
    if(!$formData['family_name'])
        throw new Exception("Поле Фамилия не должно быть пустым");
    if(!$formData['fiz_name'])
        throw new Exception("Поле Имя не должно быть пустым");
}
elseif ($formData['type'] == 3) {
    $formData['name'] = $formData['family_name'] . " " . $formData['fiz_name'] . " " . $formData['surname'];
    if(!$formData['family_name'])
        throw new Exception("Поле Фамилия не должно быть пустым");
    if(!$formData['fiz_name'])
        throw new Exception("Поле Имя не должно быть пустым");
    if(!$formData['passport_series'])
        throw new Exception("Поле Серия паспорта не должно быть пустым");
    if(!$formData['passport_number'])
        throw new Exception("Поле Номер паспорта не должно быть пустым");
    if(!$formData['birthday'])
        throw new Exception("Поле Дата рождения не должно быть пустым");
}
