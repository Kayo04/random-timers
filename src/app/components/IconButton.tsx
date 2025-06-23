interface IconButtonProps {
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

export default function IconButton({ icon, isActive, onClick }: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-full text-3xl transition-all ${
        isActive 
          ? 'bg-white text-gray-900 shadow-lg' 
          : 'bg-gray-900 bg-opacity-20 text-gray-900 hover:bg-opacity-30'
      }`}
      aria-label="Change timer"
    >
      {icon}
    </button>
  );
}