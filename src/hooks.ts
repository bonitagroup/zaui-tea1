import _ from "lodash";
import { useEffect, useRef, useState } from "react";
import { matchStatusBarColor } from "utils/device";
import { EventName, events, Payment } from "zmp-sdk";
import { useNavigate, useSnackbar } from "zmp-ui";

export function useMatchStatusTextColor(visible?: boolean) {
  const changedRef = useRef(false);
  useEffect(() => {
    if (changedRef.current) {
      matchStatusBarColor(visible ?? false);
    } else {
      changedRef.current = true;
    }
  }, [visible]);
}

const originalScreenHeight = window.innerHeight;

export function useVirtualKeyboardVisible() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const detectKeyboardOpen = () => {
      setVisible(window.innerHeight + 160 < originalScreenHeight);
    };
    window.addEventListener("resize", detectKeyboardOpen);
    return () => {
      window.removeEventListener("resize", detectKeyboardOpen);
    };
  }, []);

  return visible;
}

export const useHandlePayment = () => {
  const navigate = useNavigate();
  useEffect(() => {
    events.on(EventName.OpenApp, (data) => {
      if (data?.path) {
        navigate(data?.path, {
          state: data,
        });
      }
    });

    events.on(EventName.OnDataCallback, (resp) => {
      const { appTransID, eventType } = resp;
      if (appTransID || eventType === "PAY_BY_CUSTOM_METHOD") {
        navigate("/result", {
          state: resp,
        });
      }
    });

    events.on(EventName.PaymentClose, (data = {}) => {
      const { zmpOrderId } = data;
      navigate("/result", {
        state: { data: { zmpOrderId } },
      });
    });
  }, []);
};

export function useToBeImplemented() {
  const snackbar = useSnackbar();
  return () =>
    snackbar.openSnackbar({
      type: "success",
      text: "Chức năng dành cho các bên tích hợp phát triển...",
    });
}

export function useHeaderHiddenOnScroll(selector = ".flex-1.overflow-auto") {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const container = document.querySelector(selector) || window;
    const handleScroll = () => {
      const scrollTop =
        container === window
          ? window.scrollY
          : (container as HTMLElement).scrollTop;
      setHidden(scrollTop === 0);
    };
    if (container === window) {
      window.addEventListener("scroll", handleScroll, { passive: true });
    } else {
      (container as HTMLElement).addEventListener("scroll", handleScroll, {
        passive: true,
      });
    }
    return () => {
      if (container === window) {
        window.removeEventListener("scroll", handleScroll);
      } else {
        (container as HTMLElement).removeEventListener("scroll", handleScroll);
      }
    };
  }, [selector]);

  return hidden;
}
