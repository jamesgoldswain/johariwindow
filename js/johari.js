var personalities = new Array()

$(document).ready(function () {
    $('#adjectives tr td').click(function (e) {

        (personalities.length >= 5 && personalities.length <= 6) ? $('#done').removeAttr("disabled") : $('#done').prop( "disabled", true )
      
        $('#messages').empty()
        var selectedAdjective = $(e.target)

        if (selectedAdjective.hasClass('selected')) {
            $(e.target).removeClass('selected')
            personalities = personalities.filter(function (e) { return e !== selectedAdjective.text() })
        } else {
          
            if (personalities.length < 6) {
                personalities.push(selectedAdjective.text())
                $(e.target).addClass('selected')
            } else {
                $('#messages').text('Sorry you can only add 6')
            }
        }
    })
})