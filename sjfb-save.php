<?php
//PHP example for saving the form

//get the submitted data and decode it
$form_data = json_decode(file_get_contents('php://input'));

foreach ($form_data as $key => $value) {
    $field[$value->name] = $value->value;
}

//here's the formID
$formID = $field['formID'];

//and here's the form fields (converted back into json)
$formFields = json_encode($field['formFields']);

//now just save it to your database.
echo json_encode('If this was not a demo, your form would have saved successfully!');