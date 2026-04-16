import { useEffect, useState } from "react";
import { CheckCircle, X } from "lucide-react";
import { Button } from "./button";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  duration?: number;
  onClose?: () => void;
}

export const Toast = ({ message, type = "info", duration = 3000, onClose }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const getStyles = () => {
    switch (type) {
      case "success":
        return "bg-emerald-500/10 border-emerald-500/20 text-emerald-400";
      case "error":
        return "bg-red-500/10 border-red-500/20 text-red-400";
      case "info":
      default:
        return "bg-blue-500/10 border-blue-500/20 text-blue-400";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5" />;
      case "error":
        return <X className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border ${getStyles()} shadow-lg animate-in slide-in-from-top-2`}>
      {getIcon()}
      <span className="text-sm font-medium">{message}</span>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          setIsVisible(false);
          onClose?.();
        }}
        className="h-6 w-6 p-0 hover:bg-transparent"
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
};

interface ToastContainerProps {
  toasts: Array<{
    id: string;
    message: string;
    type: "success" | "error" | "info";
  }>;
  onRemove: (id: string) => void;
}

export const ToastContainer = ({ toasts, onRemove }: ToastContainerProps) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => onRemove(toast.id)}
        />
      ))}
    </div>
  );
};