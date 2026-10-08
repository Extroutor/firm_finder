<?php
if ($card) {
    unset($rw["passport_series"]);
    unset($rw["passport_number"]);
    if (isset($rw["type"]) and $rw["type"] == "3") {
        unset($rw["full_name"]);
        unset($rw["name"]);
        unset($rw["kpp"]);
        unset($rw["ogrn"]);
        unset($rw["okpo"]);
        unset($rw["gendir_name"]);
        unset($rw["gendir_title"]);
        unset($rw["buh_name"]);
        unset($rw["responsible_docs"]);
        unset($rw["responsible_docs_title"]);
        unset($rw["self_regular_firm_name"]);
        unset($rw["self_regular_firm_inn"]);
        unset($rw["self_regular_firm_ogrn"]);
        unset($rw["uraddress"]);
        unset($rw["post_address"]);
        unset($rw["firm_info"]);
        unset($rw["passport_date"]);
    } elseif (isset($rw["type"]) and $rw["type"] == "2") {
        unset($rw["kpp"]);
        unset($rw["gendir_name"]);
        unset($rw["buh_name"]);
        unset($rw["birthday"]);
        unset($rw["passport_date"]);
    } else {
        unset($rw["family_name"]);
        unset($rw["fiz_name"]);
        unset($rw["surname"]);
		unset($rw["birthday"]);
	}
}

