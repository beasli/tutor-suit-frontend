// Custom event emitter class
class EventEmitter {
    constructor() {
      this.events = {};
    }
  
    // Method to subscribe to an event
    subscribe(eventName, callback) {
      // Create an array for the event if it doesn't exist
      if (!this.events[eventName]) {
        this.events[eventName] = [];
      }
  
      // Add the callback function to the event array
      this.events[eventName].push(callback);
  
      // Return a function to unsubscribe from the event
      return () => this.unsubscribe(eventName, callback);
    }
  
    // Method to unsubscribe from an event
    unsubscribe(eventName, callback) {
      // Check if the event exists
      if (!this.events[eventName]) {
        return;
      }
  
      // Remove the callback function from the event array
      this.events[eventName] = this.events[eventName].filter(fn => fn !== callback);
    }
  
    // Method to publish/fire an event
    publish(eventName, data) {
      // Check if the event exists
      if (!this.events[eventName]) {
        return;
      }
  
      // Call all the subscribed callback functions for the event
      this.events[eventName].forEach(callback => {
        callback(data);
      });
    }
  }
  /* --------------
  // Usage example
  const emitter = new EventEmitter();
  
  // Subscribe to a custom event and get the unsubscribe function
  const unsubscribe = emitter.subscribe('customEvent', data => {
    console.log('Custom event fired!', data);
  });
  
  // Publish/fire the custom event
  emitter.publish('customEvent', 'Hello, world!');
  
  // Unsubscribe from the event
  unsubscribe();
  
  // Publish/fire the custom event again (no subscribers, so no output)
  emitter.publish('customEvent', 'This event has been unsubscribed');
  -----------
  */