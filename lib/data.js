import fs from 'fs';
import path from 'path';


// get filepath to data directory
const dataDir = path.join(process.cwd(), "data");


// return all ids for all json objects in array
export function getAllIds() {
     // get filepath to json file
     const filePath = path.join(dataDir, "people.json");
     // load json file components
     const jsonString = fs.readFileSync(filePath, 'utf8');
    // convert string from file into json array object
     const jsonObj = JSON.parse(jsonString);
     // use map method on array to extract ONLY the id properties into a new array of object values
     return jsonObj.map(item => {
        return {
            params: {
                id: item.id.toString()
            }
        }
     });
}


// function returns names and ids for all json objects in array, sorted by name property
export function getSortedList() {
    const filePath = path.join(dataDir, 'people.json');
    const jsonString = fs.readFileSync(filePath, 'utf8');
    const jsonObj = JSON.parse(jsonString);
    jsonObj.sort(function (a, b) {
        return a.name.localeCompare(b.name);
    });
    return jsonObj.map(item => {
        return {
            id: item.id.toString(),
            email: item.email,
            name: item.name
        }
    });
}

// function returns names and ids for all json objects in array, sorted by name property
export function getSortedList2() {
    const filePath = path.join(dataDir, 'otherpeople.json');
    const jsonString = fs.readFileSync(filePath, 'utf8');
    const jsonObj = JSON.parse(jsonString);
    jsonObj.sort(function (a, b) {
        return a.friend_name[0].localeCompare(b.friend_name[0]);
    });
    return jsonObj.map(item => {
        return {
            id: item.id.toString(),
            friend_name: item.friend_name
        }
    });
}


// async function to get the relevant data for one person
// used by getStaticProps() function located in [id].js
export async function getData(idRequested) {
    // get filepath to json file
    const filePath = path.join(dataDir, 'people.json');
    const filePath2 = path.join(dataDir, 'otherpeople.json');
    // load json file contents
    const jsonString = fs.readFileSync(filePath, 'utf8');
    const jsonString2 = fs.readFileSync(filePath2, 'utf8');
    // convert string from file into json array object
    const jsonObj = JSON.parse(jsonString);
    const jsonObj2 = JSON.parse(jsonString2);
    // return object with id value that exactly matches idRequested value
    const objMatch = jsonObj.filter( obj => {
        return obj.id.toString() === idRequested;
        }
    );
    // extract object value in filtered array, if any
        let objReturned;
        if  (objMatch.length > 0) {
        // 0 = 0 position in new array of ids that match idRequested (aka first match)
            objReturned = objMatch[0];
            // hold results of filtering otherpeople.json to pull correct id
            const objMatch2 = jsonObj2.filter( obj => {
                return obj.id.toString() === idRequested;
            }
        );
        if (objMatch2.length > 0) {
            // since entry was found in otherpeople, find any with corresponding id
            const objMatch3 = jsonObj.filter( obj => {
                return objMatch2[0].friend_name.includes (obj.id);
            }
        );
        if (objMatch3.length > 0) {
                objReturned.friend_name = objMatch3;
        }
        }
        console.log(objReturned);

        } else {
            objReturned = {};
        }
        return objReturned;
}