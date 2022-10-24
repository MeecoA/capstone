import * as fire from '../src/index.js';
console.log('database: ', fire.database);


// displayLogs(); //display logs

jQuery(function () {
    $('#logs-id').on('click', (e) => {
        console.log('Logs qr.js');
        displayLogs();
    });
});

async function displayLogs() {
    const myQuery = fire.doQuery(fire.myCollection(fire.database, 'logs'));
    fire.myOnSnapshot(myQuery, (snapshot) => {     //based on the query, //change this back!
        const unsubCollection = fire.myOnSnapshot(myQuery, (snapshot) => {     //based on the query
            let logs = [];
            let index = 0;
            snapshot.docs.forEach((doc) => {
                let unpackData = {...doc.data()};
                let objSize = Object.keys(unpackData).length;
                Object.entries(unpackData).map((element, index) => {
                    if(objSize-1 !== index) {
                        console.log(index, element[1]);
                        element[1]['time_in'] = Date(new Date(0).setUTCSeconds(element[1]['time_in']['seconds']));
                        element[1]['time_out'] = element[1]['time_out'] === '' ? '' : new Date(element[1]['time_out']).toLocaleString('en-GB',{timeZone:'UTC'})

                        index += 1; //increment
                        logs.push(element[1]);
                    }
                });
            });
            console.log(logs); 

            //Sort the data by time_scanned
            logs.sort(function(a, b) {
                return new Date(a.time_scanned) - new Date(b.time_scanned);
            });
            console.log('sorted:', logs);   //print the result

            jQuery((e) => {
                console.log("DataTable");
                $(".table_id").DataTable({
                    scrollX: true,
                    "data": logs,
                    "columns": [
                        {"data": "time_in"},
                        {"data": "time_out"},
                        {"data": "plate_number"},
                        {"data": "owner"},
                    ]
                });
            }); //jQuery
        }); //end of function
    }); //end of snapshot function
}




