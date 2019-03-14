
var response = {
    id : '',
    qualities: []
}

$(document).ready(function () {

    response.id = window.location.search.replace('?','')

    //checkJohariSubmission(response.id)

    $('#adjectives tr td').click(function (e) {

        (response.qualities.length >= 5 && response.qualities.length <= 6) ? $('#footer').show() : $('#footer').hide()
      
        var selectedAdjective = $(e.target)

        if (selectedAdjective.hasClass('selected')) {
            $(e.target).removeClass('selected')
            response.qualities = response.qualities.filter(function (e) { return e !== selectedAdjective.text() })
        } else {
          
            if (response.qualities.length < 6) {
                response.qualities.push(selectedAdjective.text())
                $(e.target).addClass('selected')
            } else {
                $('#messagesText').text('Sorry you can only add 6')
                $('#messages').show()
            }
        }
    })

    $('#done').click(function(){
        $.post( "https://johariapi.jamesgoldswain.net/v1/add" , JSON.stringify(response) )
         .done(function( data ) {
            $('#adjectives').hide()
            $('#footer').hide()
            $('#messagesText').text('Thanks a stack!')
            $('#messages').show()
       })
    })

    function checkJohariSubmission(id){
        $.get( "https://johariapi.jamesgoldswain.net/v1/check" , { id })
        .done(function( data ) {
            if (!!data.id) {
                $('#messagesText').text(`It looks like you've already submitted a Johari for me, thanks!`)
                $('#messages').show()
                $('#footer').hide()
                $('#adjectives').hide()
            }else{
                $('#adjectives').show()
            }
        })
    }

    $('#ok').click(function(){
        $('#popup').hide()
        $('#adjectives').show()
    })

    $('#messagesOk').click(function(e){
        $(e.target).parent().hide()
    })
})