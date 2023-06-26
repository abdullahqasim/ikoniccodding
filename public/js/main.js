var skeletonId = 'skeleton';
var contentId = 'content';
var skipCounter = 0;
var takeAmount = 10;
var requestUrl = '';


function getRequests(mode) {

    $("#load_more_btn_suggestion").addClass("d-none");
    $("#load_more_btn_request").removeClass("d-none");
    $("#load_more_btn_connection").addClass("d-none");
    $("#load_more_btn_common_connection").addClass("d-none");

    // show skeletons
    if(mode != 1){
        $("#skeleton").removeClass("d-none")
    }
    // hide content
    skipCounter = 0;
    requestUrl = '/show-requests';

    var form = ajaxForm([
        ['skipCounter', 0],

        ['takeAmount', takeAmount],
    ]);
    var functionsOnSuccess = [
        [showRequest, [1, 'response']]
    ];
    ajax(requestUrl, 'POST', functionsOnSuccess, form);
}

function getMoreRequests(mode) {
    $("#skeleton").removeClass("d-none")
    var form = ajaxForm([
        ['skipCounter', skipCounter],
        ['takeAmount', takeAmount],
    ]);
    var functionsOnSuccess = [
        [appendRequest, [0, 'response']]
    ];
    ajax(requestUrl, 'POST', functionsOnSuccess, form);
}

function getConnections(mode) {
    if(mode != 1){
        $("#skeleton").removeClass("d-none")
    }
    $("#load_more_btn_suggestion").addClass("d-none");
    $("#load_more_btn_request").addClass("d-none");
    $("#load_more_btn_connection").removeClass("d-none");
    $("#load_more_btn_common_connection").addClass("d-none");
    // show skeletons
    // hide content
    skipCounter = 0;
    requestUrl = '/received-requests';

    var form = ajaxForm([
        ['skipCounter', 0],

        ['takeAmount', takeAmount],
    ]);
    var functionsOnSuccess = [
        [showReceivedConnections, [1, 'response']]
    ];
    ajax(requestUrl, 'POST', functionsOnSuccess, form);
}

function getMoreConnections() {
    $("#skeleton").removeClass("d-none")
    var form = ajaxForm([
        ['skipCounter', skipCounter],
        ['takeAmount', takeAmount],
    ]);
    var functionsOnSuccess = [
        [appendReceivedConnections, [1, 'response']]
    ];
    ajax(requestUrl, 'POST', functionsOnSuccess, form);
}

function getConnectionsInCommon(mode) {
    if(mode != 1){
        $("#skeleton").removeClass("d-none")
    }

    $("#load_more_btn_suggestion").addClass("d-none");
    $("#load_more_btn_request").addClass("d-none");
    $("#load_more_btn_connection").addClass("d-none");
    $("#load_more_btn_common_connection").removeClass("d-none");
    // show skeletons
    // hide content
    skipCounter = 0;
    requestUrl = '/show-connections';

    var form = ajaxForm([
        ['skipCounter', 0],

        ['takeAmount', takeAmount],
    ]);
    var functionsOnSuccess = [
        [showCommonConnections, [1, 'response']]
    ];
    ajax(requestUrl, 'POST', functionsOnSuccess, form);


  // your code here...
}

function getMoreConnectionsInCommon(userId, connectionId) {
    $("#skeleton").removeClass("d-none")
    var form = ajaxForm([
        ['skipCounter', skipCounter],
        ['takeAmount', takeAmount],
    ]);
    var functionsOnSuccess = [
        [appendCommonConnections, [1, 'response']]
    ];
    ajax(requestUrl, 'POST', functionsOnSuccess, form);
}

function getSuggestions(mode) {
    if(mode != 1){

        $("#skeleton").removeClass("d-none")
    }
    $("#load_more_btn_suggestion").removeClass("d-none");
    $("#load_more_btn_request").addClass("d-none");
    $("#load_more_btn_connection").addClass("d-none");
    $("#load_more_btn_common_connection").addClass("d-none");
    // show skeletons
    // hide content
    skipCounter = 0;
    requestUrl = '/suggestions';

    var form = ajaxForm([
        ['skipCounter', 0],

        ['takeAmount', takeAmount],
    ]);
    var functionsOnSuccess = [
        [showSuggestion, [1, 'response']]
    ];
    ajax(requestUrl, 'POST', functionsOnSuccess, form);
}

function getMoreSuggestions() {
    $("#skeleton").removeClass("d-none")
    var form = ajaxForm([
        ['skipCounter', skipCounter],
        ['takeAmount', takeAmount],
    ]);
    var functionsOnSuccess = [
        [appendSuggestion, [1, 'response']]
    ];
    ajax(requestUrl, 'POST', functionsOnSuccess, form);
}

function sendRequest(suggestionId) {
    requestUrl = '/send-request';

    var form = ajaxForm([

        ['suggestionId', suggestionId],
    ]);
    var functionsOnSuccess = [
        [getSuggestions, [1, 'response']]
    ];
    ajax(requestUrl, 'POST', functionsOnSuccess, form);
}

function deleteRequest(userId) {

    requestUrl = '/delete-request';

    var form = ajaxForm([

        ['userId', userId],
    ]);
    var functionsOnSuccess = [
        [getRequests, [1, 'response']]
    ];
    ajax(requestUrl, 'POST', functionsOnSuccess, form);

  // your code here...
}

function acceptRequest(userId) {

    $("#skeleton").removeClass("d-none")
    requestUrl = '/accept-request';

    var form = ajaxForm([

        ['userId', userId],
    ]);
    var functionsOnSuccess = [
        [getConnections, [1, 'response']]
    ];
    ajax(requestUrl, 'POST', functionsOnSuccess, form);
}

function removeConnection(userId) {

    requestUrl = '/remove-connection';

    var form = ajaxForm([

        ['userId', userId],
    ]);
    var functionsOnSuccess = [
        [getConnectionsInCommon, [1, 'response']]
    ];
    ajax(requestUrl, 'POST', functionsOnSuccess, form);
}

$(function () {
  getSuggestions();
});

function showSuggestion(exampleVariable, response) {
    $("#skeleton").addClass("d-none")
    skipCounter += response.length
    var html = '';
    for (let i = 0; i < response.length; i++) {
        html +=

        `<div class="my-2 shadow  text-white bg-dark p-1" id="${response[i].id}">
            <div class="d-flex justify-content-between">
                <table class="ms-1">
                    <tbody>
                        <tr>
                            <td class="align-middle">${response[i].name}</td>
                            <td class="align-middle"> - </td>
                            <td class="align-middle">${response[i].email}</td>
                            <td class="align-middle"></td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <button onclick="sendRequest(${response[i].id})" id="create_request_btn_${response[i].id}" class="btn btn-primary me-1">Connect</button>
                </div>
            </div>
        </div>
    `;
    }

    $('#content').html(html);

}

function appendSuggestion(exampleVariable, response) {

    $("#skeleton").addClass("d-none")
    skipCounter += response.length
    var html = '';
    for (let i = 0; i < response.length; i++) {
        html +=

        `<div class="my-2 shadow  text-white bg-dark p-1" id="${response[i].id}">
            <div class="d-flex justify-content-between">
                <table class="ms-1">
                    <tbody>
                        <tr>
                            <td class="align-middle">${response[i].name}</td>
                            <td class="align-middle"> - </td>
                            <td class="align-middle">${response[i].email}</td>
                            <td class="align-middle"></td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <button onclick="sendRequest(${response[i].id})" id="create_request_btn_${response[i].id}" class="btn btn-primary me-1">Connect</button>
                </div>
            </div>
        </div>
    `;
    }

    $('#content').append(html);

}

function showRequest(exampleVariable, response) {

    $("#skeleton").addClass("d-none")
    skipCounter += response.length
    var html = '';
    for (let i = 0; i < response.length; i++) {
        html +=

        `<div class="my-2 shadow  text-white bg-dark p-1" id="${response[i].id}">
            <div class="d-flex justify-content-between">
                <table class="ms-1">
                    <tbody>
                        <tr>
                            <td class="align-middle">${response[i].name}</td>
                            <td class="align-middle"> - </td>
                            <td class="align-middle">${response[i].email}</td>
                            <td class="align-middle"></td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <button onclick="deleteRequest(${response[i].id})" id="create_request_btn_${response[i].id}" class="btn btn-danger me-1">Withdraw Request</button>
                </div>
            </div>
        </div>
    `;
    }

    $('#content').html(html);

}

function appendRequest(exampleVariable, response) {

    $("#skeleton").addClass("d-none")
    skipCounter += response.length
    var html = '';
    for (let i = 0; i < response.length; i++) {
        html +=

        `<div class="my-2 shadow  text-white bg-dark p-1" id="${response[i].id}">
            <div class="d-flex justify-content-between">
                <table class="ms-1">
                    <tbody>
                        <tr>
                            <td class="align-middle">${response[i].name}</td>
                            <td class="align-middle"> - </td>
                            <td class="align-middle">${response[i].email}</td>
                            <td class="align-middle"></td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <button onclick="sendRequest(${response[i].id})" id="create_request_btn_${response[i].id}" class="btn btn-danger me-1">Withdraw Request</button>
                </div>
            </div>
        </div>
    `;
    }

    $('#content').append(html);

}

function showReceivedConnections(exampleVariable, response) {

    $("#skeleton").addClass("d-none")
    skipCounter += response.length
    var html = '';
    for (let i = 0; i < response.length; i++) {
        html +=

        `<div class="my-2 shadow  text-white bg-dark p-1" id="${response[i].id}">
            <div class="d-flex justify-content-between">
                <table class="ms-1">
                    <tbody>
                        <tr>
                            <td class="align-middle">${response[i].name}</td>
                            <td class="align-middle"> - </td>
                            <td class="align-middle">${response[i].email}</td>
                            <td class="align-middle"></td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <button onclick="acceptRequest(${response[i].id})" id="create_request_btn_${response[i].id}" class="btn btn-primary me-1">Accept</button>
                </div>
            </div>
        </div>
    `;
    }

    $('#content').html(html);

}

function appendReceivedConnections(exampleVariable, response) {

    $("#skeleton").addClass("d-none")
    skipCounter += response.length
    var html = '';
    for (let i = 0; i < response.length; i++) {
        html +=

        `<div class="my-2 shadow  text-white bg-dark p-1" id="${response[i].id}">
            <div class="d-flex justify-content-between">
                <table class="ms-1">
                    <tbody>
                        <tr>
                            <td class="align-middle">${response[i].name}</td>
                            <td class="align-middle"> - </td>
                            <td class="align-middle">${response[i].email}</td>
                            <td class="align-middle"></td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <button onclick="acceptRequest(${response[i].id})" id="create_request_btn_${response[i].id}" class="btn btn-primary me-1">Accept</button>
                </div>
            </div>
        </div>
    `;
    }

    $('#content').append(html);

}

function showCommonConnections(exampleVariable, response) {

    $("#skeleton").addClass("d-none")
    skipCounter += response.length
    var html = '';
    for (let i = 0; i < response.length; i++) {
        html +=

        `<div class="my-2 shadow  text-white bg-dark p-1" id="${response[i].id}">
            <div class="d-flex justify-content-between">
                <table class="ms-1">
                    <tbody>
                        <tr>
                            <td class="align-middle">${response[i].name}</td>
                            <td class="align-middle"> - </td>
                            <td class="align-middle">${response[i].email}</td>
                            <td class="align-middle"></td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <button style="width: 220px" id="get_connections_in_common_" class="btn btn-primary" type="button"
                        data-bs-toggle="collapse" data-bs-target="#collapse_" aria-expanded="false" aria-controls="collapseExample">
                            Connections in common (${response[i].common_friends})
                    </button>
                    <button onclick="removeConnection(${response[i].id})" id="create_request_btn_${response[i].id}" class="btn btn-danger me-1">Remove Connection</button>
                </div>
            </div>
        </div>
    `;
    }

    $('#content').html(html);

}

function appendCommonConnections(exampleVariable, response) {

    $("#skeleton").addClass("d-none")
    skipCounter += response.length
    var html = '';
    for (let i = 0; i < response.length; i++) {
        html +=

        `<div class="my-2 shadow  text-white bg-dark p-1" id="${response[i].id}">
            <div class="d-flex justify-content-between">
                <table class="ms-1">
                    <tbody>
                        <tr>
                            <td class="align-middle">${response[i].name}</td>
                            <td class="align-middle"> - </td>
                            <td class="align-middle">${response[i].email}</td>
                            <td class="align-middle"></td>
                        </tr>
                    </tbody>
                </table>
                <div>
                <button style="width: 220px" id="get_connections_in_common_" class="btn btn-primary" type="button"
                        data-bs-toggle="collapse" data-bs-target="#collapse_" aria-expanded="false" aria-controls="collapseExample">
                            Connections in common (${response[i].common_friends})
                    </button>
                    <button onclick="removeConnection(${response[i].id})" id="create_request_btn_${response[i].id}" class="btn btn-danger me-1">Remove Connection</button>
                </div>
            </div>
        </div>
    `;
    }

    $('#content').append(html);

}
