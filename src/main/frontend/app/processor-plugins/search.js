onmessage = function(e) {
    console.warn("===== INSIDE WEB WORKER ====");
    console.log("e: ", e);
    var input = JSON.parse(e.data);
    console.log("search.js input", input);
    var baseUrl = input.baseUrl;
    var queryText = input.text;
    var footprint = input.footprint;
    var sort = (input.sort) ? input.sort : 'beginposition';
    var order = (input.order) ? input.order : 'desc';
    var offset = (input.offset) ? input.offset : '0';
    var limit = (input.limit) ? input.limit : '50';
    var filter = this.createSearchFilter(queryText, footprint);
    var method = (input.method) ? input.method : 'GET';
    // for(var i = 0; i < input.length; i++){
    //   console.log("input[i]: ", input[i]);
    // }
    var searchUrl = "/api/owc/products?filter=:filter&offset=:offset&limit=:limit&sortedby=:sort&order=:order";
    searchUrl = searchUrl.replace(':filter', filter)
        .replace(':offset', offset)
        .replace(':limit', limit)
        .replace(':sort', sort)
        .replace(':order', order);

    this.sendRequest(method, baseUrl + searchUrl, input.options).then(function(response) {
        console.log("in sendRequest", response)
        postMessage((response.data) ? JSON.stringify(response.data) : "");
    });

}

/**
 * This method manages the filters to be included in the request
 * @param {String} text: the current query text
 * @param {String} footprint: the current polygon
 *
 * @return {String} searchFilter
 */
function createSearchFilter(text, footprint) {
    var searchFilter = '';
    if (text != null && text.length > 0) {
        searchFilter += text;
    } else {
        searchFilter += '*';
    }
    if (footprint && footprint.length > 0) searchFilter += ((text && text.length > 0) ? ' AND ' : '') + footprint;
    return searchFilter;
}

/**             
 *  Check if the parameter is a string 
 *
 * @param {?String} value
 * @return {Boolean}
 */
function isString(value) {
    return typeof value === 'string';
}

/**             
 *   Convert the string to json
 *
 * @param {?String} json
 * @return {Object}
 */
function fromJson(json) {
    return this.isString(json) ? JSON.parse(json) : json;
}

/**             
 * Check if the string is like a json object
 *
 * @param {?String} value
 * @return {Boolean}
 */
function isJsonLike(str) {
    str = str.trim();
    var JSON_START = /^\[|^\{(?!\{)/;
    var JSON_ENDS = {
        '[': /]$/,
        '{': /}$/
    };
    var jsonStart = str.match(JSON_START);
    return jsonStart && JSON_ENDS[jsonStart[0]].test(str);
}

function _processResponse(response, status, headers) {

    var processedResponse = response;
    if (isJsonLike(response)) {
        processedResponse = this.fromJson(response);
    }
    return {
        data: processedResponse,
        status: status,
        headers: headers
    };
}

function sendRequest(method, url, options) {
    var self = this;
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        if (options && options.headers) {
            for (var i = 0; i < options.headers.length; i++) {
                xhr.setRequestHeader(options.headers[i].name, options.headers[i].value);
            }
        }
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {

                resolve(self._processResponse(xhr.response, xhr.status, xhr.getAllResponseHeaders()));
            } else {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function() {
            reject({
                status: xhr.status,
                statusText: xhr.statusText
            });
        };
        if (options && options.body) {
            xhr.send(options.body);
        } else {
            xhr.send();
        }
    });
}
