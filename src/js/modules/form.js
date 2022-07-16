/* Элементы форм

 */

const conf = {

    // если что-то меняется здесь, то нужно изменить и в комменатрии к функции initFormControlPassword
    formPasswordSelector: '.form-password',
    formPasswordBtnSelector: '.form-password-button',
    formPasswordInputSelector: '.form-control'
}

export function initForm() {
    initFormControlPassword();
}

/* поле ввода пароля

* <div class="form-password">
*     <input id="password" type="password" class="form-control" autocomplete="on"/>
*     <i class="form-password-button material-icons">visibility</i>
* </div>
*/
function initFormControlPassword() {
    const formPasswordFields = $(conf.formPasswordSelector);

    for (const field of formPasswordFields) {
        const btnDisplay = $(field).find(conf.formPasswordBtnSelector);
        const passwordInput = $(field).find(conf.formPasswordInputSelector);

        btnDisplay.mousedown((e) => {
            e.preventDefault();

            btnDisplay.html('visibility_off')
            passwordInput.attr('type', 'text');
        });

        btnDisplay.mouseup((e) => {
            e.preventDefault();

            btnDisplay.html('visibility')
            passwordInput.attr('type', 'password');
        });

        btnDisplay.mouseleave((e) => {
            e.preventDefault();

            btnDisplay.html('visibility')
            passwordInput.attr('type', 'password');
        });
    }
}