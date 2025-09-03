import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shuffle, Check, X } from 'lucide-react';

// Emoji options for master password (4 categories, 6 emojis each)
const EMOJI_CATEGORIES = {
  faces: ['😊', '😎', '🤔', '😴', '🥳', '🤨'],
  nature: ['🌟', '🌙', '⭐', '🌈', '🔥', '💧'],
  objects: ['🔑', '🛡️', '💎', '🎯', '🚀', '⚡'],
  symbols: ['❤️', '💜', '💚', '💙', '🧡', '💛'],
};

const ALL_EMOJIS = Object.values(EMOJI_CATEGORIES).flat();

interface EmojiMasterPasswordProps {
  onComplete: (emojis: string) => void;
  mode: 'setup' | 'verify';
  targetEmojis?: string;
  isLoading?: boolean;
}

export function EmojiMasterPassword({ onComplete, mode, targetEmojis, isLoading }: EmojiMasterPasswordProps) {
  const [selectedEmojis, setSelectedEmojis] = useState<string[]>([]);
  const [availableEmojis, setAvailableEmojis] = useState(ALL_EMOJIS);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    if (mode === 'verify' && targetEmojis && selectedEmojis.length === 4) {
      const isMatch = selectedEmojis.join('') === targetEmojis;
      setIsCorrect(isMatch);
      
      if (isMatch) {
        setTimeout(() => onComplete(selectedEmojis.join('')), 500);
      }
    }
  }, [selectedEmojis, targetEmojis, mode, onComplete]);

  const shuffleEmojis = () => {
    const shuffled = [...ALL_EMOJIS].sort(() => Math.random() - 0.5);
    setAvailableEmojis(shuffled);
  };

  const handleEmojiSelect = (emoji: string) => {
    if (selectedEmojis.length < 4) {
      setSelectedEmojis(prev => [...prev, emoji]);
    }
  };

  const removeEmoji = (index: number) => {
    setSelectedEmojis(prev => prev.filter((_, i) => i !== index));
    setIsCorrect(null);
  };

  const handleSubmit = () => {
    if (selectedEmojis.length === 4) {
      onComplete(selectedEmojis.join(''));
    }
  };

  const reset = () => {
    setSelectedEmojis([]);
    setIsCorrect(null);
  };

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <div className="text-center">
        <h3 className="font-semibold mb-2">
          {mode === 'setup' ? 'Create Your 4-Emoji Master Password' : 'Enter Your 4-Emoji Master Password'}
        </h3>
        <p className="text-sm text-muted-foreground">
          {mode === 'setup' 
            ? 'Select 4 emojis in order. Remember this sequence - it\'s your master key!'
            : 'Enter the 4 emojis you selected during setup'
          }
        </p>
      </div>

      {/* Selected Emojis Display */}
      <div className="flex justify-center">
        <div className="flex space-x-3 p-4 rounded-lg border-2 border-dashed border-gray-300 min-w-[200px]">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center text-2xl cursor-pointer transition-all ${
                selectedEmojis[index]
                  ? mode === 'verify' && isCorrect === false
                    ? 'border-red-300 bg-red-50 shake'
                    : mode === 'verify' && isCorrect === true
                    ? 'border-green-300 bg-green-50'
                    : 'border-primary bg-primary/10'
                  : 'border-gray-300 bg-gray-50'
              }`}
              onClick={() => selectedEmojis[index] && removeEmoji(index)}
            >
              {selectedEmojis[index] || '?'}
            </div>
          ))}
        </div>
      </div>

      {/* Verification Status */}
      {mode === 'verify' && selectedEmojis.length === 4 && (
        <div className="text-center">
          {isCorrect === true && (
            <Badge className="status-success">
              <Check className="w-3 h-3 mr-1" />
              Correct! Unlocking vault...
            </Badge>
          )}
          {isCorrect === false && (
            <Badge className="status-critical">
              <X className="w-3 h-3 mr-1" />
              Incorrect sequence. Try again.
            </Badge>
          )}
        </div>
      )}

      {/* Emoji Selection Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Choose your emojis:</span>
          <Button
            variant="outline"
            size="sm"
            onClick={shuffleEmojis}
            className="text-xs"
          >
            <Shuffle className="w-3 h-3 mr-1" />
            Shuffle
          </Button>
        </div>

        <div className="grid grid-cols-8 gap-2">
          {availableEmojis.map((emoji, index) => (
            <button
              key={`${emoji}-${index}`}
              onClick={() => handleEmojiSelect(emoji)}
              disabled={selectedEmojis.length >= 4}
              className={`w-10 h-10 text-xl rounded-md border transition-all hover:scale-105 ${
                selectedEmojis.length >= 4
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:border-primary hover:bg-primary/10 border-gray-200'
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      {mode === 'setup' && (
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={reset}
            disabled={selectedEmojis.length === 0}
            className="flex-1"
          >
            Reset
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={selectedEmojis.length !== 4 || isLoading}
            className="flex-1"
          >
            {isLoading ? 'Setting up...' : 'Confirm Master Password'}
          </Button>
        </div>
      )}

      {mode === 'verify' && isCorrect === false && (
        <Button
          variant="outline"
          onClick={reset}
          className="w-full"
        >
          Clear & Try Again
        </Button>
      )}
    </div>
  );
}