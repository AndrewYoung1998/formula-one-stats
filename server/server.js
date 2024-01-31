import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import { parseString } from 'xml2js';

const app = express();
const port = 3001; // You can choose any available port

app.use(cors()); // Enable CORS for your server

app.get('/api/drivers/:year', async (req, res) => {
    const { year } = req.params;
    try {
        const apiUrl = `https://ergast.com/api/f1/${year}/drivers`;
        const options = {
            method: 'GET',
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/xml'
            }
        }
        const response = await fetch(apiUrl,options);
        const data = await response.text();
        // Assuming 'data' contains the XML data
        parseString(data, async (err, result) => {
            if (err) {
                console.error('Error parsing XML:', err);
            } else {
                // 'result' now contains the parsed XML data as a JavaScript object
                console.log('Results' + result);
                await res.json(result);
            }
        });
        //console.log(data)
        //await res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
