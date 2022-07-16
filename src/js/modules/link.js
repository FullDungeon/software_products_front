const bootstrap = require('bootstrap');

const conf = {
    linkSelector: '.link',
    fieldSelector: '.field'
};

const ui = {
    modal: $('#modalDiscardChanges'),
};

/**
 * Создание обработчиков событий для всех элементов с классом conf.linkClassName
 *
 * При нажатии на любой из них, если в текущем окне есть несохраненные изменения (при изменение занчений в conf.fieldClassName),
 * то появится модальное окно с предупреждением об этом. Если пользователь нажмет "Ок",
 * то будет совершен переход по ссылке.
 *
 * @param state  - объект с полем hasChanges
 */
export function initLink(state) {
    const links = $(conf.linkSelector);
    const fields = $(conf.fieldSelector);

    links.click((e) => {
        e.preventDefault();

        const link = e.target.closest('.link');

        if (state.hasOwnProperty('hasChanges')) {
            if (state.hasChanges === true) {
                openModal(() => {
                    document.location = $(link).attr('href');
                    state.hasChanges = false; // сброс изменений
                });
            }
            else {
                // переход без модального окна (несохраненных изменений нет)
                document.location = $(link).attr('href');
            }
        }
        else {
            console.error('modules/link.js: state has not property \'hasChanges\'');
        }
    })

    initFields(state, fields);
}


/**
 * При вводе в элементы с классом conf.fieldClassName меняется значение state.hasChanges на true
 */
function initFields(state, fields) {
    for (let field of fields) {
        $(field).change((e) => {
            state.hasChanges = true;
        });
    }
}


/**
 * Открытие модального окна.
 *
 * Оповещение о том, что есть несохраненные изменения и что они будут сброшены, если продолжить.
 * Вызов callback при положительном ответе пользователя.
 */
function openModal(callback) {
    if (ui.modal.length === 0) {
        console.error('modules/link.js: modal window does not exists\n\n');
        return;
    }

    console.log(ui.modal)

    const modal = new bootstrap.Modal(ui.modal);

    // нажатие на кнопку Ок
    $(ui.modal).find('.modal-button-ok').click(() => {
        callback();
        modal.hide();
    })

    // отображение
    modal.show();
}