import type { PiniaPluginContext } from "pinia";

const localStoragePlugin = (context: PiniaPluginContext) => {
    const { store } = context

    const storeState = localStorage.getItem(store.$id);

    if (storeState) {
        store.$patch(JSON.parse(storeState))
    }

    store.$subscribe((mutation,state)=>{
     localStorage.setItem(store.$id,JSON.stringify(state))
    });
}



export default localStoragePlugin;