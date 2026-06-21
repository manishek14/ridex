"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Info, AlertTriangle, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { removeToast } from "@/store/slices/uiSlice";
import { cn } from "@/lib/utils";

const icons = {
  success: <CheckCircle size={16} className="text-green-400" />,
  error:   <XCircle    size={16} className="text-red-400"   />,
  info:    <Info       size={16} className="text-blue-400"  />,
  warning: <AlertTriangle size={16} className="text-yellow-400" />,
};

const colors = {
  success: "border-green-500/20",
  error:   "border-red-500/20",
  info:    "border-blue-500/20",
  warning: "border-yellow-500/20",
};

function ToastItem({ id, type, message }: { id: string; type: string; message: string }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setTimeout(() => dispatch(removeToast(id)), 4000);
    return () => clearTimeout(timer);
  }, [id, dispatch]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 80, scale: 0.9 }}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-xl min-w-[280px] max-w-sm",
        "bg-[var(--bg2)] border backdrop-blur-md shadow-xl",
        colors[type as keyof typeof colors] ?? "border-[var(--bdr)]"
      )}
    >
      {icons[type as keyof typeof icons]}
      <p className="text-sm text-[var(--fg2)] flex-1">{message}</p>
      <button
        onClick={() => dispatch(removeToast(id))}
        className="text-[var(--fg4)] hover:text-[var(--fg)] transition-colors"
      >
        <X size={14} />
      </button>
    </motion.div>
  );
}

export function ToastContainer() {
  const toasts = useAppSelector((s) => s.ui.toasts);

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2" dir="auto">
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => (
          <ToastItem key={t.id} {...t} />
        ))}
      </AnimatePresence>
    </div>
  );
}

// Helper hook
export function useToast() {
  const dispatch = useAppDispatch();

  return {
    success: (message: string) =>
      dispatch({ type: "ui/addToast", payload: { type: "success", message } }),
    error: (message: string) =>
      dispatch({ type: "ui/addToast", payload: { type: "error", message } }),
    info: (message: string) =>
      dispatch({ type: "ui/addToast", payload: { type: "info", message } }),
    warning: (message: string) =>
      dispatch({ type: "ui/addToast", payload: { type: "warning", message } }),
  };
}
