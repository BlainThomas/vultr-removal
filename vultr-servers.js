const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.API_KEY;

async function stopVultrComputeServer(serverId) {
  try {
    await axios.post(`https://api.vultr.com/v2/instances/${serverId}/halt`, {}, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`
      }
    });
    console.log(`Server ${serverId} stopped successfully.`);
  } catch (error) {
    console.error(`Error stopping server ${serverId}:`, error.response ? error.response.data : error.message);
  }
}

async function destroyVultrComputeServer(serverId) {
  try {
    await axios.delete(`https://api.vultr.com/v2/instances/${serverId}`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`
      }
    });
    console.log(`Server ${serverId} destroyed successfully.`);
  } catch (error) {
    console.error(`Error destroying server ${serverId}:`, error.response ? error.response.data : error.message);
  }
}

async function stopAndDestroyAllVultrComputeServers() {
  try {
    while (true) { // Loop indefinitely until there are no servers left
      const response = await axios.get('https://api.vultr.com/v2/instances', {
        headers: {
          'Authorization': `Bearer ${API_KEY}`
        }
      });

      const servers = response.data.instances;
      if (servers.length === 0) {
        console.log('No compute servers left. All servers have been stopped and destroyed.');
        break; // Exit the loop if no servers are found
      }

      for (const server of servers) {
        await stopVultrComputeServer(server.id); // Stop each server
        await destroyVultrComputeServer(server.id); // Destroy each server
      }

      // Wait for a few seconds before checking again to prevent rate limiting
      console.log('Waiting before checking for more servers...');
      await new Promise(resolve => setTimeout(resolve, 10000)); // Wait for 10 seconds
    }
  } catch (error) {
    console.error('Error during the stop and destroy process:', error.response ? error.response.data : error.message);
  }
}

stopAndDestroyAllVultrComputeServers();
