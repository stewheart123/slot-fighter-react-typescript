// ModelManager.ts

type Model = {
    value: boolean;
  };
  
  const model: Model = {
    value: false,
  };
  
  const listeners: (() => void)[] = [];
  
  const updateModelValue = (value: boolean) => {
    model.value = value;
    notifyListeners();
  };
  
  const notifyListeners = () => {
    listeners.forEach(listener => listener());
  };
  
  const subscribeToModelUpdates = (listener: () => void) => {
    listeners.push(listener);
  };
  
  export { model, updateModelValue, subscribeToModelUpdates };
  