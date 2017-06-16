onmessage = function(e) {
    console.warn("===== INSIDE WEB WORKER ====");
    console.log("e: ", e);
    var input = JSON.parse(e.data);
    console.log("input ", input);
    // for(var i = 0; i < input.length; i++){
    //   console.log("input[i]: ", input[i]);
    // }
    
    var list = {
        "masters": [{
            "id": 225,
            "uuid": "99712ff0-a77f-42da-b4fd-3235bacb6b46",
            "type": "OL_1_ERR___",
            "attributes": [
                "Date: 2017-02-24T06:29:57.858268Z",

                "Instrument: OLCI",
                "Size: 701.46 MB"
            ],
            "slaves": [{
                "id": 225,
                "uuid": "99712ff0-a77f-42da-b4fd-3235bacb6b46",
                "type": "OL_1_ERR___",
                "attributes": [
                    "Date: 2017-02-24T06:29:57.858268Z",
                    "Instrument: OLCI",
                    "Size: 701.46 MB"
                ]
            }, {
                "id": 225,
                "uuid": "99712ff0-a77f-42da-b4fd-3235bacb6b46",
                "type": "OL_1_ERR___",
                "attributes": [
                    "Date: 2017-02-24T06:29:57.858268Z",
                    "Instrument: OLCI",
                    "Size: 701.46 MB"
                ]
            }]
        }, {
            "id": 219,
            "uuid": "b0db9b1e-a004-4808-9f86-28b6b47b1622",
            "type": "SR_1_SRA_A_",
            "attributes": [
                "Date: 2017-03-04T22:17:02.968847Z",
                "Instrument: SRAL",
                "Size: 36.49 KB"
            ],
            "slaves": [{
                "id": 225,
                "uuid": "99712ff0-a77f-42da-b4fd-3235bacb6b46",
                "type": "OL_1_ERR___",
                "attributes": [
                    "Date: 2017-02-24T06:29:57.858268Z",
                    "Instrument: OLCI",
                    "Size: 701.46 MB"
                ]
            }, {
                "id": 225,
                "uuid": "99712ff0-a77f-42da-b4fd-3235bacb6b46",
                "type": "OL_1_ERR___",
                "attributes": [
                    "Date: 2017-02-24T06:29:57.858268Z",
                    "Instrument: OLCI",
                    "Size: 701.46 MB"
                ]
            }]
        }]
    };

   
    postMessage(JSON.stringify(list));

}
