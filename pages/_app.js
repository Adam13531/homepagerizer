import "rc-tooltip/assets/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import "rc-checkbox/assets/index.css";
import "line-awesome/dist/line-awesome/css/line-awesome.css";
import "../css/tailwind.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
