const networkLogger = (response) => {
  if (response?.config?.url) {
    console.log(response?.config?.baseURL + response?.config?.url);
  }
  if (response?.config?.params) {
    console.log({params: response.config.params});
  }
  if (response?.config?.data) {
    console.log({data: response.config.data});
  }
  if (response?.data) {
    console.log({data: response.data});
  }
  console.log({response});
  console.log("========");
};

export { networkLogger};
