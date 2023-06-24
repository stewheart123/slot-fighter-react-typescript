/**
 * Live components is used to make note of containers, used like scenes
 * Always wrap a scene in a component and add it to this object. 
 * Destroy the object and make the value undefined in this object
 */

const liveComponents: { loadScreen: undefined | any, splashScreen: undefined | any } = {
    loadScreen: undefined,
    splashScreen: undefined
  };
  
  export default liveComponents;
  