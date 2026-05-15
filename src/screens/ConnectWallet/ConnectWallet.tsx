import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useConnectWallet } from "../../context/ConnectWalletContext";
import { useAuth } from "../../context/useAuth";
import ConnectWalletModal from "../../components/ConnectWalletModal";
import { ChainAlert } from "@components/ui/ChainAlert";

export const ConnectWallet = (): JSX.Element => {
  const navigate = useNavigate();
  const { isOpen } = useConnectWallet();
  const { loading, isAuthenticated } = useAuth();

  // If user is already authenticated, redirect to dashboard
  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate("/owner-dashboard", { replace: true });
      return;
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#221810] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-[#ff6600] border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-400">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Show full page with wallet selection
  return (
    <div className="w-full min-h-screen bg-[#221810] flex flex-col">
      <ChainAlert />
      <div className="w-full flex-1 flex flex-col items-center justify-start px-4 sm:px-8 py-8 sm:py-12">
        <ConnectWalletModal onClose={() => navigate("/")} />
      </div>
    </div>
  );
};
