const store={};
/**
 * 
 * @param {string} eventName  - name of event to listen to
 * @param {function} callback  - the function to invoke when event is fired
 */
const subscribe= (eventName,callback) =>{
    if(!store[eventName]){
        store[eventName] = new Set();

    }
    store[eventName].add(callback);
};
/**
 * 
 * @param {string} eventName  - name of event to unsubscribe from
 * @param {function} callback  - the function to unsubscribe
 */
const unsubscribe= (eventName,callback) =>{
    if(store[eventName]){
          store[eventName].delete(callback);
    }
    
};

/**
 * 
 * @param {string} eventName  - name of event to publish
 * @param {function} payload  - the payload list of he enevt to [ublish]
 */
const publish= (eventName,payload) =>{
    if(store[eventName]){
          store[eventName].forEach(callback => {
           try {
                callback(payload);
           } catch (error) {
                console.error(error);
           }
          });
    }
    
};
/* Export these follwoing 3 functions to any JS code you wanyt to import */
export default{
    subscribe,
    unsubscribe,
    publish
};