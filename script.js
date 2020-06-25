
// search-button event listener, console-logged and event.prevent default to stop auto-refresh:
$('#search-button').on('click', function (event) {
    event.preventDefault()
    console.log("button works")
})
