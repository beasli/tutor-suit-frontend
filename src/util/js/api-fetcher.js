class APIFetcher {
    static fetchData(url, method = 'GET', data = null, token = '') {
      return new Promise((resolve, reject) => {
        const options = {
          method,
          headers: {},
        };
  
        if (token) {
          options.headers.Authorization = `Bearer ${token}`;
        }
  
        if (method !== 'GET') {
          const formData = new FormData();
          for (const key in data) {
           
            if (key.endsWith('[]')) {

              for (let i = 0; i < data[key].length; i++) {
                formData.append(key, data[key][i]);
            }

            } else {
              formData.append(key, data[key]);
            }
            
          }
          console.log(formData)
          options.body = formData;
        }

        //console.log(options);
  
        fetch(url, options)
          .then(response => response.json())
          .then(data => resolve(data))
          .catch(error => resolve(error));
      });
    }
  }
  
//   // Example usage - GET request with Authorization token
//   const getApiUrl = 'https://admin-firsttoy.myclientdemo.us/api/pages';
//   const getToken = null;
  
//   APIFetcher.fetchData(getApiUrl, null, 'GET', getToken)
//     .then(response => {
//       // Render HTML using the response data
//       console.log(response);
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
  

  // Example usage - POST request with FormData and Authorization token
//   const postApiUrl = 'https://api.example.com/data';
  
//   const postData = {
//     name: 'John Doe',
//     email: 'johndoe@example.com',
//     file: document.querySelector('#fileInput').files[0], // Example file input
//   };
  
//   const postToken = 'your-authorization-token';
  
//   APIFetcher.fetchData(postApiUrl, postData, 'POST', postToken)
//     .then(response => {
//       // Render HTML using the response data
//       console.log(response);
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
  