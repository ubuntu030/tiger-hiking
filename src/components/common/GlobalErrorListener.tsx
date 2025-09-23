import { useEffect } from "react";
import { useToast } from "../../hooks/useToast";
import { eventBus } from "../../lib/eventBus";
import type { ToastType } from "./Toast";

interface ToastPayload {
  message: string;
  type: ToastType;
}

const GlobalErrorListener = () => {
  const { showToast } = useToast();

  useEffect(() => {
    const handleError = (payload: ToastPayload) => {
      if (payload && payload.message) {
        showToast(payload.message, payload.type || "error");
      }
    };

    eventBus.on("SHOW_TOAST", handleError);

    return () => {
      eventBus.off("SHOW_TOAST", handleError);
    };
  }, [showToast]);

  return null; // 這個元件不渲染任何 UI
};

export default GlobalErrorListener;
