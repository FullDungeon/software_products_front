import 'select2/dist/js/select2.min';

const ui = {
    multiselectSelector: "select[multiple]"
}

export function initMultiselect() {
    $(ui.multiselectSelector).select2({
        closeOnSelect: false,
        width: 'resolve'
    });
}