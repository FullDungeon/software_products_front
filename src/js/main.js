import { initDatatables } from './modules/data-table';
import { initMultiselect } from "./modules/multiselect";
import {initLink} from "./modules/link";
import {initForm} from "./modules/form";

$(document).ready(() => {
    initDatatables();
    initMultiselect();
    initLink(State);
    initForm();
});

const State = {
    hasChanges: false
};


/**
 * удаление с body класса .preload, блокирующего все анимации
 */
$(window).on('load', function() {
    $("body").removeClass("preload");
});

