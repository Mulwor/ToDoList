import ReactDOM from "react-dom/client";
import "./index.css";
import { store } from "./components/redux/store";
import { Provider } from "react-redux";
import AppWithRedux from "./components/redux/App_With_Redux";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Provider store={store}>
    <AppWithRedux />
  </Provider>,
);
