
var response = {
    id : '',
    qualities: []
}

$(document).ready(function () {

    response.id = window.location.search.replace('?','')

    //checkJohariSubmission(response.id)

    $('#adjectives tr td').click(function (e) {

        (response.qualities.length >= 5 && response.qualities.length <= 6) ? $('#done').show() : $('#done').hide()
      
        $('#messages').empty()
        var selectedAdjective = $(e.target)

        if (selectedAdjective.hasClass('selected')) {
            $(e.target).removeClass('selected')
            response.qualities = response.qualities.filter(function (e) { return e !== selectedAdjective.text() })
        } else {
          
            if (response.qualities.length < 6) {
                response.qualities.push(selectedAdjective.text())
                $(e.target).addClass('selected')
            } else {
                $('#messages').text('Sorry you can only add 6')
            }
        }
    })

    $('#done').click(function(){
        $.post( "https://johariapi.jamesgoldswain.net/v1/add" , JSON.stringify(response) )
         .done(function( data ) {
            $('#adjectives').hide()
            $('#done').hide()
            $('#messages').text('Thanks a stack!')
         })
      })


    function checkJohariSubmission(id){
        $.get( "https://johariapi.jamesgoldswain.net/v1/check" , { id })
        .done(function( data ) {
            if (!!data.id) {
                $('#messages').text(`It looks like you've already submitted a Johari for me, thanks!`)
                $('#done').hide()
                $('#adjectives').hide()
            }else{
                $('#adjectives').show()
            }
        })
    }

    $('#ok').click(function(){
        $('#popup').hide()
    })
})