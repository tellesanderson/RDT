import React, { useState } from "react";
import { Share2, Download, Check } from "lucide-react";
import html2canvas from "html2canvas";

interface ShareCardButtonProps {
  elementId: string;
  matchInfo: string;
}

export const ShareCardButton: React.FC<ShareCardButtonProps> = ({ elementId, matchInfo }) => {
  const [sharing, setSharing] = useState(false);
  const [shared, setShared] = useState(false);

  const handleShare = async () => {
    const targetElement = document.getElementById(elementId);
    if (!targetElement) {
      alert("Erro ao gerar imagem de compartilhamento.");
      return;
    }

    setSharing(true);

    try {
      // Small delay to ensure rendering is complete
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const canvas = await html2canvas(targetElement, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#0d0e15", // dark background for the card
        scale: 2, // better quality
        logging: false
      });

      canvas.toBlob(async (blob) => {
        if (!blob) {
          throw new Error("Canvas is empty");
        }

        const file = new File([blob], `radar-${matchInfo}.png`, { type: "image/png" });

        // Check if Web Share API is available with file sharing support
        if (
          navigator.share && 
          navigator.canShare && 
          navigator.canShare({ files: [file] })
        ) {
          await navigator.share({
            files: [file],
            title: "Notas do Jogo - Radar da Torcida",
            text: `Veja minhas avaliações de hoje no Radar da Torcida! ⚽`
          });
          setShared(true);
          setTimeout(() => setShared(false), 2000);
        } else {
          // Fallback to manual download
          const imageUrl = canvas.toDataURL("image/png");
          const downloadLink = document.createElement("a");
          downloadLink.href = imageUrl;
          downloadLink.download = `radar-${matchInfo}.png`;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
          
          alert("Imagem baixada! Agora você pode compartilhar no seu Status do WhatsApp ou Redes Sociais.");
        }
      }, "image/png");

    } catch (error) {
      console.error("Error generating share image:", error);
      alert("Houve um erro ao gerar a imagem. Tentando baixar a imagem diretamente...");
    } finally {
      setSharing(false);
    }
  };

  return (
    <button
      onClick={handleShare}
      disabled={sharing}
      className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-lg ${
        shared 
          ? "bg-emerald-600 text-white shadow-emerald-600/10" 
          : "bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:opacity-95 shadow-emerald-500/10 active:scale-98"
      }`}
    >
      {sharing ? (
        <>
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Gerando Card...
        </>
      ) : shared ? (
        <>
          <Check size={16} />
          Compartilhado com sucesso!
        </>
      ) : (
        <>
          <Share2 size={16} />
          Compartilhar no WhatsApp/Status
        </>
      )}
    </button>
  );
};
