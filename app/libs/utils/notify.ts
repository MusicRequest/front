import { toast } from "react-toastify";

export const notifyError = (
  msg: string,
  position = toast.POSITION.TOP_RIGHT
) => {
  toast.error(msg, {
    position: position,
  });
};

export const notifySuccess = (
  msg: string,
  position = toast.POSITION.TOP_RIGHT
) => {
  toast.success(msg, {
    position: position,
  });
};
