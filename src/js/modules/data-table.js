const dt = require('datatables.net');
const bootstrap = require('bootstrap');

require('datatables.net-bs5');
require('datatables.net-buttons-bs5');
require('datatables.net-searchpanes-bs5');

const conf = {
    dataTableClassName: '.data-table',
    deleteRecordBtnSelector: '.data-table-btn[data-action="delete"]'
};

const ui = {
    modal: $('#modalDeleteRecord')
};

export function initDatatables() {
    const dataTables = $(conf.dataTableClassName);

    if (dataTables.length) {
        for (let table of dataTables) {
            initDatatable($(table));
        }
    }
}


/**
 * инициализация таблицы table
 */
function initDatatable(table) {

    // количество столбцов в таблице
    const columnCount = table.find('th').length;
    console.log(columnCount);

    let dataTable = table.DataTable({
        autoWidth: true,
        columnDefs: [
            {
                "searchable": false,
                "orderable": false,
                "targets": 0
            },
            {
                "searchable": false,
                "orderable": false,
                "targets": columnCount - 1 // последний столбец
            }
        ],
        order: [[1, 'asc']],
        language: {
            "decimal": "",
            "emptyTable": "В таблице нет данных",
            "info": "_START_ - _END_ (всего _TOTAL_ записей)",
            "infoEmpty": "Showing 0 to 0 of 0 entries",
            "infoFiltered": "(filtered from _MAX_ total entries)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Показано _MENU_ записей",
            "loadingRecords": "Загрузка...",
            "processing": "Обработка...",
            "search": "Поиск:",
            "zeroRecords": "Не найдено ни одного соответствия",
            "paginate": {
                "first": "В начало",
                "last": "В конец",
                "next": "Далее",
                "previous": "Назад"
            },
            "aria": {
                "sortAscending": ": нажмите, чтобы отсортировать по возрастанию",
                "sortDescending": ": нажмите, чтобы сортировать по убыванию"
            }
        }
    });

    setAutoincrement(dataTable);
    initDeleteRowBtn(table);
}


/**
 автонумерация первого столбца таблицы
 */
function setAutoincrement(dataTable) {
    dataTable.on('order.dt search.dt', function () {
        dataTable.column(0, {search: 'applied', order: 'applied'}).nodes().each(function (cell, i) {
            cell.innerHTML = (i + 1).toString();
        });
    }).draw();
}


/**
 * инициализация кнопок удаления
 */
function initDeleteRowBtn(table) {
    table.find(conf.deleteRecordBtnSelector).click(element => {
        element.preventDefault();
        const btn = $(element.currentTarget);

        // информация об удаляемой записе и ссылка для удаления
        const recordName = btn.attr('data-record-name');
        const url = btn.attr('href');

        showModal(recordName, () => {
            document.location = url;
        });
    });
}


/**
 * открыть модальное окно с предупреждением об удалении записи
 */
function showModal(recordName, callback) {
    if (ui.modal === undefined) {
        console.error('modules/data-table.js: modal window does not exists\n\n');
        return;
    }

    const modal = new bootstrap.Modal(ui.modal);

    ui.modal.find('.modal-body .modal-record-name').html(recordName);
    ui.modal.find('.modal-button-ok').click(() => {
        callback();
        modal.hide();
    });

    modal.show();
}