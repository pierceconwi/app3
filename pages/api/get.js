// demo on how to get json file out of filesystem and convert to object value, sort, and send back to browser

import fs from 'fs';
import path from 'path';

// use path to build filepath to data subdirectory
const dataDir = path.join( process.cwd(), "data" );

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const filepath = path.join( dataDir, "people.json" );

  // synchronosly read file
  const jsonData = fs.readFileSync( filepath, "utf8" );

  // pull data
  const jsonObj = JSON.parse( jsonData );


  // sort data
  jsonObj.sort(
    function(a,b) {
      return a.name.localeCompare(b.name);
    }
  );

  // return sorted data to browser
  res.status(200).json( jsonObj );
} 
