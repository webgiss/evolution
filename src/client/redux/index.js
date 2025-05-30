import { actions, slices } from "@/redux/slices";
import { init_debug } from "@/tools/debug";

export const init = (store) => {
  init_debug(store, actions, slices);
  store.dispatch(actions.evoMap.reset());
}