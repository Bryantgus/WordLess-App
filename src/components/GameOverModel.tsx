type Props = {
  onClose: () => void;
  word: string;
  didWin: boolean;
};

export default function GameOverModal({ onClose, word, didWin }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
   
      <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"></div>

      <div className="relative z-10 bg-white rounded-2xl shadow-xl p-6 w-80 text-center">
        <h2 className="text-2xl font-bold mb-4">
          {didWin ? "🎉 ¡Ganaste!" : "😢 Perdiste"}
        </h2>
        <p className="mb-4">
          La palabra era: <strong>{word}</strong>
        </p>
        <button
          onClick={onClose}
          className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
        >
          Jugar de nuevo
        </button>
      </div>
    </div>
  );
}
