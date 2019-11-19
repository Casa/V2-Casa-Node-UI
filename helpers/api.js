// An object to store the ressponse time of completed API requests
const responseTime = {};

// An object to store pending API requests
const responsePending = {};

// Helper methods for making API requests
const API = {
  async get(axios, url, query = {}) {
    let response;

    if (responsePending[url] === undefined || responsePending[url] === false) {
      responsePending[url] = true;

      try {
        const startTime = new Date();
        response = (await axios.get(url, {params: query})).data;
        const endTime = new Date();

        responseTime[url] = (endTime.getTime() - startTime.getTime()) / 1000;
      } catch (error) {
        // Only display error messages in the browser console
        if (process.browser) {
          console.error(error);
        }

        response = false;
      } finally {
        responsePending[url] = false; // eslint-disable-line require-atomic-updates
      }
    } else {
      console.warn(`Warning: A request to ${url} is already in progress. Duplicate connection skipped.`);
    }

    return response;
  },
};

export default API;
