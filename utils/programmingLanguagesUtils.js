export function findLanguageName(programmingLanguageId) {
  // Map of IDs to language strings
  const languageMap = {
    45: 'x86asm', // Example for Assembly
    46: 'bash',
    47: 'basic',
    48: 'c',
    49: 'c',
    50: 'c',
    51: 'csharp',
    52: 'cpp',
    53: 'cpp',
    54: 'cpp',
    55: 'lisp', // Common Lisp
    56: 'd',
    57: 'elixir',
    58: 'erlang',
    60: 'go',
    61: 'haskell',
    62: 'java',
    63: 'javascript',
    64: 'lua',
    65: 'ocaml',
    66: 'octave',
    67: 'pascal',
    68: 'php',
    69: 'prolog',
    70: 'python', // Python 2
    71: 'python', // Python 3
    72: 'ruby',
    73: 'rust',
    74: 'typescript',
    75: 'c', // C using Clang
    76: 'cpp', // C++ using Clang
    77: 'cobol',
    78: 'kotlin',
    79: 'objectivec',
    80: 'r',
    81: 'scala',
    82: 'sql',
    83: 'swift',
    84: 'vbnet',
    85: 'perl',
    86: 'clojure',
    87: 'fsharp',
    88: 'groovy',
  };

  // Retrieve the language string by id
  const languageString = languageMap[programmingLanguageId];

  // Return the language string or a default message if not found
  return languageString ? languageString : 'Language not found';
}
