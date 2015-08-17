/**
 * Simple jQuery Form Builder (SJFB)
 * Copyright (c) 2015 Brandon Hoover, Hoover Web Development LLC (http://bhoover.com)
 * http://bhoover.com/simple-jquery-form-builder/
 * SJFB may be freely distributed under the included MIT license (license.txt).
 */

//generates the form HTML
function generateForm(formID) {

    //empty out the preview area
    $("#sjfb-fields").empty();

    $.getJSON('sjfb-load.php?form_id=' + formID, function(data) {
        if (data) {
            //go through each saved field object and render the form HTML
            $.each( data, function( k, v ) {

                var fieldType = v['type'];

                //Add the field
                $('#sjfb-fields').append(addFieldHTML(fieldType));
                var $currentField = $('#sjfb-fields .sjfb-field').last();

                //Add the label
                $currentField.find('label').text(v['label']);

                //Any choices?
                if (v['choices']) {

                    var uniqueID = Math.floor(Math.random()*999999)+1;

                    $.each( v['choices'], function( k, v ) {

                        if (fieldType == 'select') {
                            var selected = v['sel'] ? ' selected' : '';
                            var choiceHTML = '<option' + selected + '>' + v['label'] + '</option>';
                            $currentField.find(".choices").append(choiceHTML);
                        }

                        else if (fieldType == 'radio') {
                            var selected = v['sel'] ? ' checked' : '';
                            var choiceHTML = '<label><input type="radio" name="radio-' + uniqueID + '"' + selected + ' value="' + v['label'] + '">' + v['label'] + '</label>';
                            $currentField.find(".choices").append(choiceHTML);
                        }

                        else if (fieldType == 'checkbox') {
                            var selected = v['sel'] ? ' checked' : '';
                            var choiceHTML = '<label><input type="checkbox" name="checkbox-' + uniqueID + '[]"' + selected + ' value="' + v['label'] + '">' + v['label'] + '</label>';
                            $currentField.find(".choices").append(choiceHTML);
                        }

                    });
                }

                //Is it required?
                if (v['req']) {
                    if (fieldType == 'text') { $currentField.find("input").prop('required',true).addClass('required-choice') }
                    else if (fieldType == 'textarea') { $currentField.find("textarea").prop('required',true).addClass('required-choice') }
                    else if (fieldType == 'select') { $currentField.find("select").prop('required',true).addClass('required-choice') }
                    else if (fieldType == 'radio') { $currentField.find("input").prop('required',true).addClass('required-choice') }
                    $currentField.addClass('required-field');
                }

            });
        }

        //HTML templates for rendering frontend form fields
        function addFieldHTML(fieldType) {

            var uniqueID = Math.floor(Math.random()*999999)+1;

            switch (fieldType) {

                case 'text':
                    return '' +
                        '<div id="sjfb-' + uniqueID + '" class="sjfb-field sjfb-text">' +
                        '<label for="text-' + uniqueID + '"></label>' +
                        '<input type="text" id="text-' + uniqueID + '">' +
                        '</div>';

                case 'textarea':
                    return '' +
                        '<div id="sjfb-' + uniqueID + '" class="sjfb-field sjfb-textarea">' +
                        '<label for="textarea-' + uniqueID + '"></label>' +
                        '<textarea id="textarea-' + uniqueID + '"></textarea>' +
                        '</div>';

                case 'select':
                    return '' +
                        '<div id="sjfb-' + uniqueID + '" class="sjfb-field sjfb-select">' +
                        '<label for="select-' + uniqueID + '"></label>' +
                        '<select id="select-' + uniqueID + '" class="choices choices-select"></select>' +
                        '</div>';

                case 'radio':
                    return '' +
                        '<div id="sjfb-' + uniqueID + '" class="sjfb-field sjfb-radio">' +
                        '<label></label>' +
                        '<div class="choices choices-radio"></div>' +
                        '</div>';

                case 'checkbox':
                    return '' +
                        '<div id="sjfb-checkbox-' + uniqueID + '" class="sjfb-field sjfb-checkbox">' +
                        '<label class="sjfb-label"></label>' +
                        '<div class="choices choices-checkbox"></div>' +
                        '</div>';

                case 'agree':
                    return '' +
                        '<div id="sjfb-agree-' + uniqueID + '" class="sjfb-field sjfb-agree required-field">' +
                        '<input type="checkbox" required>' +
                        '<label></label>' +
                        '</div>'
            }
        }
    });
}
