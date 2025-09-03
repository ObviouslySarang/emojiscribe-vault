/**
 * Secure Emo - Emoji-based Password Visualization System
 * 
 * Security Note: This is for VISUALIZATION ONLY. Real encryption happens
 * with AES-256-GCM. Emojis provide a fun, memorable way to represent passwords
 * while maintaining visual security.
 */

// Comprehensive emoji mapping for all ASCII characters
export const EMOJI_MAPPING: Record<string, string> = {
  // Numbers 0-9
  '0': '🔴', '1': '🔵', '2': '🟢', '3': '🟡', '4': '🟠', 
  '5': '🟣', '6': '⚫', '7': '⚪', '8': '🔶', '9': '🔷',
  
  // Lowercase letters a-z
  'a': '🍎', 'b': '🎈', 'c': '🐱', 'd': '🐶', 'e': '🌍', 
  'f': '🔥', 'g': '🍇', 'h': '🏠', 'i': '🍦', 'j': '⚡', 
  'k': '🔑', 'l': '🌙', 'm': '🗻', 'n': '🌟', 'o': '🌊', 
  'p': '🍕', 'q': '👑', 'r': '🌹', 's': '☀️', 't': '🌳', 
  'u': '☂️', 'v': '💜', 'w': '💧', 'x': '❌', 'y': '💛', 'z': '⚡',
  
  // Uppercase letters A-Z
  'A': '🅰️', 'B': '🅱️', 'C': '©️', 'D': '💎', 'E': '📧', 
  'F': '🎏', 'G': '💚', 'H': '🏥', 'I': 'ℹ️', 'J': '🎭', 
  'K': '👺', 'L': '💝', 'M': 'Ⓜ️', 'N': '🎵', 'O': '⭕', 
  'P': '🅿️', 'Q': '🔍', 'R': '®️', 'S': '💰', 'T': '🎯', 
  'U': '🛡️', 'V': '✌️', 'W': '🌊', 'X': '✖️', 'Y': '🎪', 'Z': '💤',
  
  // Special characters
  '!': '❗', '@': '💫', '#': '🔥', '$': '💲', '%': '🔋', 
  '^': '⬆️', '&': '🤝', '*': '⭐', '(': '🌘', ')': '🌒', 
  '-': '➖', '_': '〰️', '+': '➕', '=': '⚖️', '[': '📦', 
  ']': '📋', '{': '🎁', '}': '🎀', '|': '🗼', '\\': '🔀', 
  ':': '👀', ';': '😉', '"': '💬', "'": '💭', '<': '⬅️', 
  '>': '➡️', ',': '🍃', '.': '⚪', '?': '❓', '/': '🔄',
  '~': '🌊', '`': '💎', ' ': '➖'
};

// Reverse mapping for decoding
export const REVERSE_EMOJI_MAPPING = Object.fromEntries(
  Object.entries(EMOJI_MAPPING).map(([char, emoji]) => [emoji, char])
);

/**
 * Convert text to emoji sequence for visual display
 * @param text - Plain text to convert
 * @returns Emoji sequence string
 */
export function textToEmoji(text: string): string {
  return text
    .split('')
    .map(char => EMOJI_MAPPING[char] || '❓')
    .join('');
}

/**
 * Convert emoji sequence back to text
 * @param emojiSequence - Emoji string to decode
 * @returns Original text
 */
export function emojiToText(emojiSequence: string): string {
  // Split emoji sequence (handle multi-byte emoji)
  const emojis = [...emojiSequence];
  return emojis
    .map(emoji => REVERSE_EMOJI_MAPPING[emoji] || '')
    .join('');
}

/**
 * Generate a secure password strength indicator
 * @param password - Password to analyze
 * @returns Strength score and feedback
 */
export function getPasswordStrength(password: string): {
  score: number;
  label: string;
  color: string;
  feedback: string[];
} {
  let score = 0;
  const feedback: string[] = [];
  
  // Length check
  if (password.length >= 12) score += 25;
  else if (password.length >= 8) score += 15;
  else feedback.push('Use at least 8 characters');
  
  // Character variety
  if (/[a-z]/.test(password)) score += 15;
  else feedback.push('Include lowercase letters');
  
  if (/[A-Z]/.test(password)) score += 15;
  else feedback.push('Include uppercase letters');
  
  if (/[0-9]/.test(password)) score += 15;
  else feedback.push('Include numbers');
  
  if (/[^A-Za-z0-9]/.test(password)) score += 20;
  else feedback.push('Include special characters');
  
  // Bonus for extra length
  if (password.length >= 16) score += 10;
  
  // Determine label and color
  let label = 'Very Weak';
  let color = 'security-critical';
  
  if (score >= 80) {
    label = 'Very Strong';
    color = 'security-success';
  } else if (score >= 60) {
    label = 'Strong';
    color = 'security-info';
  } else if (score >= 40) {
    label = 'Moderate';
    color = 'security-warning';
  } else if (score >= 20) {
    label = 'Weak';
    color = 'security-warning';
  }
  
  return { score, label, color, feedback };
}

/**
 * Mock AES-256-GCM encryption (client-side only for demo)
 * In production, this would use Web Crypto API
 */
export async function mockEncrypt(data: string, masterKey: string): Promise<string> {
  // Simulate encryption with base64 encoding
  return btoa(JSON.stringify({ data, key: masterKey.slice(0, 8) + '...' }));
}

/**
 * Mock decryption companion
 */
export async function mockDecrypt(encryptedData: string, masterKey: string): Promise<string> {
  try {
    const parsed = JSON.parse(atob(encryptedData));
    return parsed.data;
  } catch {
    throw new Error('Decryption failed');
  }
}