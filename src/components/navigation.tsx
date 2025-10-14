import React from "react";
import { useLocation, useNavigate } from "react-router";
import { Icon } from "zmp-ui";
import { useVirtualKeyboardVisible } from "../hooks";
import { getConfig } from "../utils/config";
import { CartIcon } from "./cart-icon";

type Tab = {
  path: string;
  label: string;
  icon: React.ReactNode;
};

const TABS: Tab[] = [
  { path: "/", label: "Trang chủ", icon: "zi-home" },
  { path: "/search", label: "Tìm kiếm", icon: "zi-search" },
  { path: "/cart", label: "Giỏ hàng", icon: "zi-cart" },
  { path: "/profile", label: "Tài khoản", icon: "zi-user" },
];

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const keyboardVisible = useVirtualKeyboardVisible();

  const primaryColor =
    (getConfig((c) => c.template?.primaryColor) as string) || "#006af5";

  const go = (path: string) => {
    if (location.pathname !== path) navigate(path);
  };

  const safeBottom = "env(safe-area-inset-bottom, 0px)";

  if (keyboardVisible) return null;

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        paddingBottom: `calc(${safeBottom})`,
        zIndex: 60,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "auto",
      }}
      aria-hidden={false}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 900,
          margin: "0 auto",
          padding: "0 2px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 6,
          }}
        >
          <div
            style={{
              width: 80,
              height: 6,
              background: "rgba(255,255,255,0.12)",
              borderRadius: 9999,
              transform: "translateY(2px)",
            }}
          />
        </div>

        <div
          style={{
            background: "#055140",
            borderTopLeftRadius: 55,
            borderTopRightRadius: 55,
            boxShadow: "0 -6px 20px rgba(0,0,0,0.12)",
            position: "relative",
            display: "flex",
            alignItems: "center",
            height: 78,
            padding: "0 10px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 24, flex: 1 }}>
            {TABS.slice(0, 2).map((t) => {
              const active = location.pathname === t.path;
              return (
                <button
                  key={t.path}
                  onClick={() => go(t.path)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "none",
                    background: "transparent",
                    color: active ? "#FBB801" : "rgba(255,255,255,0.85)",
                    cursor: "pointer",
                    padding: 6,
                  }}
                >
                  <Icon icon={t.icon as any} />
                  <div style={{ fontSize: 11, marginTop: 2 }}>{t.label}</div>
                </button>
              );
            })}
          </div>

          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%) translateY(0%)",
              zIndex: 70,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  background:
                    "conic-gradient(#05A143 0deg 180deg, #FBB801 180deg 360deg)",
                  animation: "spin 3s linear infinite",
                }}
              />
              <div
                onClick={() => navigate("/search")}
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  cursor: "pointer",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ transform: "translateY(1px)" }}
                >
                  <path
                    d="M12 5v14"
                    stroke="#055140"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M5 12h14"
                    stroke="#055140"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              justifyContent: "flex-end",
              flex: 1,
            }}
          >
            {TABS.slice(2).map((t) => {
              const active = location.pathname === t.path;
              return (
                <button
                  key={t.path}
                  onClick={() => go(t.path)}
                  style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "none",
                    background: "transparent",
                    color: active ? "#FBB801" : "rgba(255,255,255,0.85)",
                    cursor: "pointer",
                    padding: 6,
                  }}
                >
                  {t.path === "/cart" ? (
                    <CartIcon active={active} />
                  ) : (
                    <Icon icon={t.icon as any} />
                  )}
                  <div style={{ fontSize: 11, marginTop: 2 }}>{t.label}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export { Navigation };
export default Navigation;
