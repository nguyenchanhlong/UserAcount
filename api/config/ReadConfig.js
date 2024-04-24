import fs from 'fs';
import path from "path";


const configFilePath = path.resolve(new URL('../config/config.json', import.meta.url).pathname);
const data = fs.readFileSync(configFilePath, 'utf8');


// Parse the JSON
const jsonData = JSON.parse(data);

const port_auth = jsonData['Authentication']['PORT_AUTH'];
const host_db = jsonData['Authentication']['HOST'];
const port_db = jsonData['Authentication']['PORT_DB'];
const db = jsonData['Authentication']['DB'];
const access_token_secret = jsonData['Authentication']['ACCESS_TOKEN_SECRET'];


export {port_auth, host_db, port_db, db, access_token_secret}