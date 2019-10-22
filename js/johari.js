


$(document).ready(function () {

    const apiUrl = 'https://johariapi.jamesgoldswain.net/v1'

    var submission = {
        id: window.location.search.replace('?', ''),
        qualities: []
    }

    const request = async () => {

        const response = await fetch('/data/qualities.json');
        const json = await response.json();

        json.qualities.forEach(quality => {
            $('#adjectives').append(`<div class="col-4 themed-grid-col quality"><span>${quality}</span></div>`)
        });

        $('#ok').click(function (e) {
            $('#intro').addClass('hide');
            $('#johari').slideDown(500)
        })

        $('.quality span').click(function (e) {

            (submission.qualities.length >= 5 && submission.qualities.length <= 6) ? $('#done').removeAttr("disabled").addClass('btn-success') : $("#done").attr("disabled", true).removeClass('btn-success')

            var selectedAdjective = $(e.target)

            if (selectedAdjective.hasClass('selected')) {
                $(e.target).removeClass('selected')
                submission.qualities = submission.qualities.filter(function (e) { return e !== selectedAdjective.text() })
            } else {

                if (submission.qualities.length < 6) {
                    submission.qualities.push(selectedAdjective.text())
                    $(e.target).addClass('selected')
                } else {
                    $('#messagesText').text('Sorry you can only add 6')
                    $('#messages').show()
                }
            }
        })

        $('#done').click(function () {

            $('#done').hide()
            $('.card-deck').hide()
            $('.spinner-grow').removeClass('hide')

            $.post(`${apiUrl}/add`, JSON.stringify(submission))
                .done(function (data) {
                    $('.spinner-grow').addClass('hide')
                    $('#success').removeClass('hide')
                })
        })

    }

    const check = async () => {

        const response = await fetch(`${apiUrl}/check`, { mode: 'cors', data: submission.id })
        const json = await response.json();

        console.log(json)

    }

    //check()

    request()

})