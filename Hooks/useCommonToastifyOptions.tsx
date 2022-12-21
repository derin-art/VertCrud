import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function toastOptions() {
  return {
    position: toast.POSITION.TOP_RIGHT,
    className: "text-sm font-Poppins",
  };
}
