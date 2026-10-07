<?php
if ($formData['name']!="")
{
    $params=CLibFactory::getLib("items_names_params")->getItemsByWhere(['param_n' => 0, 'value' => $formData['name']]);
    if ($params)
        $formData['name']=array_keys($params)[0];
    else
        $formData['name']=CLibFactory::getLib("items_names_params")->getController('action')->insertItem(['param_n' => 0, 'value' => $formData['name']]);
}
for ($i=1;$i<7;$i++)
if ($formData['param'.$i]!="")
{
    $params=CLibFactory::getLib("items_names_params")->getItemsByWhere(['param_n' => $i, 'value' => $formData['param'.$i]]);
    if ($params)
        $formData['param'.$i]=array_keys($params)[0];
    else
        $formData['param'.$i]=CLibFactory::getLib("items_names_params")->getController('action')->insertItem(['param_n' => $i, 'value' => $formData['param'.$i]]);
}

?>