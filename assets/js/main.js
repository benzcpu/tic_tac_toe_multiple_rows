var setting = 50;
var turn = "X";
var row_end_game = 3;

var html_seting = "";
for (var i = 3; i <= setting; i++) {
    html_seting += "<option value='" + i + "'>" + i + "</option>"
}

$('#setting-width').html(html_seting);
$('#setting-height').html(html_seting);
$('#point-win').html(html_seting);

$(document).on('click', '#btn-start', function () {
    const colump = $('#setting-width').val();
    const rows = $('#setting-height').val();
    row_end_game = $('#point-win').val();
    var html = "";
    for (var i = 0; i < rows; i++) {
        html += "<tr>"
        for (var j = 0; j < colump; j++) {
            html += "<td data-index='" + i + '-' + j + "' ></td>"
        }
        html += "</tr>"
    }
    $('.table-tic ').html(html);
    turn = "X";
});


$(document).on('click', '.table-tic td', function () {
    var self = $(this)
    if ($(self).html() == "") {
        $(self).html(turn);
    } else {
        alert('Get Selected, Please Choose New');
        return false;
    }
    if (turn == "X") {
        turn = "O";
    } else {
        turn = "X";
    }
    checkWiner();
})


function checkWiner() {
    var table = $('.table-tic tr');
    var array_stateX = [];
    var array_stateO = [];
    var full_array = [];
    $.each(table, function (row, itemRow) {
        array_stateX[row] = []
        array_stateO[row] = []
        full_array[row] = []
        $.each($(itemRow).find('td'), function (column, itemColumn) {
            if ($(itemColumn).text() == "X") {
                array_stateX[row][column] = 1;
                full_array[row][column] = 1;
            } else {
                array_stateX[row][column] = 0;
            }
            if ($(itemColumn).text() == "O") {
                array_stateO[row][column] = 1;
            } else {

                array_stateO[row][column] = 0;
            }
            if ($(itemColumn).text() == "X" || $(itemColumn).text() == "O") {
                full_array[row][column] = 1;
            } else {
                full_array[row][column] = 0;
            }

        })
    });
    var DataStatus = stateWinner(array_stateX);

    var check_full_array = true;
    $.each(full_array, function (idx, item) {
        if (item.indexOf(0) >= 0) {
            check_full_array = false;
        }
    })


    if (DataStatus.status == "win") {
        $.each(DataStatus.state, function (idx, item) {
            $('.table-tic td[data-index=' + item + ']').css({'background-color': 'red'});
        });
        swal({
            title: "X Winner",
            icon: "success",
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    $('#btn-start').click();
                }
            });
    } else if (check_full_array == true) {

        swal({
            title: "Always",
            icon: "success",
            text: "Return To Game.",
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    $('#btn-start').click();
                }
            });

    }


    DataStatus = stateWinner(array_stateO);
    if (DataStatus.status == "win") {
        $.each(DataStatus.state, function (idx, item) {
            $('.table-tic td[data-index=' + item + ']').css({'background-color': 'red'});
        });
        swal({
            title: "O Winner",
            icon: "success",
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    $('#btn-start').click();
                }
            });
    } else if (check_full_array == true) {
        swal({
            title: "Always",
            icon: "success",
            text: "Return To Game.",
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    $('#btn-start').click();
                }
            });

    }


}

function stateWinner(array) {
    var checkSort_X = 0;
    var checkSort_Y = [];
    var checkSort_oblique_L_TO_R = 0;
    var checkSort_oblique_R_TO_L = 0;
    var pointer_win_X = [];
    var pointer_win_Y = [];
    var pointer_win_L_R = [];
    var pointer_win_R_L = [];

    var breack_for = false;


    for (var i = 0; i < array.length; i++) {

        for (var j = 0; j < array[i].length; j++) {

            if (array[i][j] == 1) {
                if (i != array.length && j != array[i].length) {
                    checkSort_X = 1;
                    checkSort_Y = 1;
                    checkSort_oblique_L_TO_R = 1;
                    checkSort_oblique_R_TO_L = 1;

                    pointer_win_X.push(i + '-' + j);
                    pointer_win_Y.push(i + '-' + j);
                    pointer_win_L_R.push(i + '-' + j);
                    pointer_win_R_L.push(i + '-' + j);
                    // //แนวนอน
                    for (var z = j + 1; z <= array[j].length; z++) {
                        if (array[i][z] == 1) {
                            checkSort_X++;
                            pointer_win_X.push(i + '-' + z);
                            if (checkSort_X >= row_end_game) {
                                breack_for = true;
                                break;
                            }
                        } else {
                            checkSort_X = 0;
                            pointer_win_X = [];
                        }
                    }
                    if (breack_for == true) {
                        break;
                    }


                    // //แนวตั้ง
                    for (var z = i + 1; z < array.length; z++) {
                        if (array[z][j] == 1) {
                            checkSort_Y++;
                            pointer_win_Y.push(z + '-' + j);
                            if (checkSort_Y >= row_end_game) {
                                breack_for = true;
                                break;
                            }
                        } else {
                            checkSort_Y = 0;
                            pointer_win_Y = [];
                        }
                    }
                    if (breack_for == true) {
                        break;
                    }


                    var down = 1;
                    for (var z = j + 1; z < array[i].length; z++) {
                        if ((i + down) < array.length) {
                            //เฉียงซ้ายไปขวา
                            if (array[i][j] == array[i + down][z]) {
                                checkSort_oblique_L_TO_R++;
                                pointer_win_L_R.push(i + down + '-' + z);
                                if (checkSort_oblique_L_TO_R >= row_end_game) {
                                    breack_for = true;
                                    break;
                                }
                            } else {
                                checkSort_oblique_L_TO_R = 0;
                                pointer_win_L_R = [];
                            }
                        }
                        down++;
                    }
                    if (breack_for == true) {
                        break;
                    }


                    down = 1;
                    for (var z = j - 1; z >= 0; z--) {
                        if ((i + down) < array.length) {
                            //เฉียงขวาไปซ้าย
                            if (array[i][j] == array[i + down][z]) {
                                pointer_win_R_L.push(i + down + '-' + z);
                                checkSort_oblique_R_TO_L++;
                                if (checkSort_oblique_R_TO_L >= row_end_game) {
                                    breack_for = true;
                                    break;
                                }
                            } else {
                                checkSort_oblique_R_TO_L = 0;
                                pointer_win_R_L = [];
                            }
                        }
                        down++;
                    }
                    if (breack_for == true) {
                        break;
                    }
                }
            } else {

            }


            if (breack_for == true) {
                break;
            }
        }
        if (breack_for == true) {
            break;
        }
    }


    if (checkSort_Y == row_end_game) {
        string_win = {'status': 'win', 'state': pointer_win_Y}
    } else if (checkSort_X == row_end_game) {
        string_win = {'status': 'win', 'state': pointer_win_X}
    } else if (checkSort_oblique_R_TO_L == row_end_game) {
        string_win = {'status': 'win', 'state': pointer_win_R_L}
    } else if (checkSort_oblique_L_TO_R == row_end_game) {
        string_win = {'status': 'win', 'state': pointer_win_L_R}
    } else {
        string_win = {'status': 'play'}
    }
    return string_win;

}