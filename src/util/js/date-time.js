class DateTime {
    static formatDate(dateString) {
        const date = new Date(dateString);
      
        const options = {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        };
      
        const formattedDate = date.toLocaleString("en-US", options);
        return formattedDate;
      }
 
      static expectedDeliveryDate(days) {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + days);
        const options = {
          year: "numeric",
          month: "long",
          day: "numeric"
        };
      
        const formattedDate = currentDate.toLocaleString("en-US", options);
        return formattedDate;
      }
}