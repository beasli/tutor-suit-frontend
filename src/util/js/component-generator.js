var self;
class ComponentGenerator {

    constructor(componentData) {
        self = this;
             // Fetch and replace the components
        componentData.forEach(({ component, data,  js_var_data}) => {
            // console.log(component)
            // Fetch the component file
            fetch(`${BASE_URL}components/${component}/${component}.html?v=${BUILD_VERSION}`, {
              mode: 'no-cors'
            })
            .then(response => response.text())
            .then(html => {
                // Replace the placeholders with the actual data
                const replacedHtml = self.replacePlaceholders(html, data);
        
                // Find the custom HTML tag in the document
                const customTag = document.querySelector(component);
        
                // Create a template element and populate it with the replaced HTML content
                const template = document.createElement('template');
                template.innerHTML = replacedHtml;
        
                // Replace the custom HTML tag with the content from the template
                customTag.replaceWith(template.content);

               
                   // Create a link element for the CSS file
                    const cssLink = document.createElement('link');
                    cssLink.rel = 'stylesheet';
                    cssLink.href = `${BASE_URL}components/${component}/${component}.css?v=${BUILD_VERSION}`; // Assuming the CSS files are named as "<componentName>.css"

                    // Insert the CSS link into the document head
                    document.head.appendChild(cssLink);

                    // Create a script element for the JavaScript file
                    const scriptElement = document.createElement('script');
                    scriptElement.src = `${BASE_URL}components/${component}/${component}.js?v=${BUILD_VERSION}`; // Assuming the JavaScript files are named as "<componentName>.js"

                    // Insert the script element into the document head or body
                    // Choose either document.head or document.body depending on where you want to insert the script
                    document.body.appendChild(scriptElement);


                    if (typeof js_var_data == 'object')
                    for (const [key, value] of Object.entries(js_var_data)) {
                      // console.log(`${key}: ${value}`);
                        const scriptElement = document.createElement('script');
                        scriptElement.innerText = `var ${key} = ${JSON.stringify(value)}`;
                        document.head.appendChild(scriptElement);
                    }
              
                

                 
            })
            .catch(error => console.log(error));
        });
    }

      // Helper function to replace placeholders with data
     replacePlaceholders(html, data) {
        let replacedHtml = html;
        for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const placeholder = `{{${key}}}`;
            const value = data[key];
            replacedHtml = replacedHtml.replace(new RegExp(placeholder, 'g'), value);
        }
        }
        return replacedHtml;
    }

    static replacePlaceholders(html, data) {
      let replacedHtml = html;
      for (const key in data) {
      if (data.hasOwnProperty(key)) {
          const placeholder = `{{${key}}}`;
          const value = data[key];
          replacedHtml = replacedHtml.replace(new RegExp(placeholder, 'g'), value);
      }
      }
      return replacedHtml;
  }


  
   

    static populateComponent({ component, data }, basePath = '.') {
        // console.log(component, data);
      
        // Create an array to store the fetch promises
        const fetchPromises = [];
      
        data.forEach(data => {
          const promise = fetch(`${BASE_URL}components/${component}/${component}.html?v=${BUILD_VERSION}`, {
            mode: 'no-cors'
          })
            .then(response => response.text())
            .then(html => {
              // Replace the placeholders with the actual data
              return self.replacePlaceholders(html, data);
            })
            .catch(error => console.log(error));
      
          fetchPromises.push(promise);
        });


        // Create a link element for the CSS file
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = `${BASE_URL}components/${component}/${component}.css?v=${BUILD_VERSION}`; // Assuming the CSS files are named as "<componentName>.css"

        // Insert the CSS link into the document head
        document.head.appendChild(cssLink);

        // Create a script element for the JavaScript file
        const scriptElement = document.createElement('script');
        scriptElement.src = `${BASE_URL}components/${component}/${component}.js?v=${BUILD_VERSION}`; // Assuming the JavaScript files are named as "<componentName>.js"

        // Insert the script element into the document head or body
        // Choose either document.head or document.body depending on where you want to insert the script
        document.body.appendChild(scriptElement);


      
        // Wait for all the fetch promises to complete
        return Promise.all(fetchPromises)
          .then(outputElements => {
            return outputElements.join(''); // Join the output elements into a single string
          });
      }
      

   

  }
  
 