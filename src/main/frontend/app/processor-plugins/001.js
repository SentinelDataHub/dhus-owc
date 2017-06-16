importScripts('../bower_components/underscore/underscore-min.js');

function getFileSize(product) {
    var summary = _.findWhere(product.indexes, {
        name: "summary"
    });
    return (summary) ? _.findWhere(summary.children, {
        name: "Size"
    }).value : '';
}

function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};

onmessage = function(e) {
    console.warn("===== INSIDE WEB WORKER ====");
    console.log("e: ", e);
    var input = JSON.parse(e.data);
    // for(var i = 0; i < input.length; i++){
    //   console.log("input[i]: ", input[i]);
    // }
    var sum = 0;
    var length = input.length;
    for (var i = 0; i < input.length; i++) {
        //var sizeString = input[i].attributes[2].Size;
        var sizeString = getFileSize(input[i]);
        var value = parseInt(sizeString.split(" ")[0]);
        
        var unity = sizeString.split(" ")[1];

        var multiplicator = 1;
        
        switch (unity) {
            case "KB":
                multiplicator = Math.pow(1024, 1);
                break;
            case "MB":
                multiplicator = Math.pow(1024, 2);
                break;
            case "GB":
                multiplicator = Math.pow(1024, 3);
                break;
            case "TB":
                multiplicator = Math.pow(1024, 4);
                break;
            case "B":
                multiplicator = 1;
                break;
        }
        
        sum += (value * multiplicator);
    }
    
    postMessage((length > 0) ? bytesToSize(sum / length) : 'N/A');

}
