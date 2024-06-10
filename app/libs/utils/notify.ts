import { toast } from "react-toastify";
import { MessageDefault } from "@/lib/enum";

export const notifyError = (
  msg?: string,
  position = toast.POSITION.TOP_RIGHT,
) => {
  toast.error(msg || MessageDefault.Error, {
    position: position,
  });
};

export const notifySuccess = (
  msg?: string,
  position = toast.POSITION.TOP_RIGHT,
) => {
  toast.success(msg || MessageDefault.Succes, {
    position: position,
  });
};
