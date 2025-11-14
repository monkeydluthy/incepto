import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface TerminalProps {
  commands: string[];
  output: string[];
  isGenerating: boolean;
}

export default function Terminal({
  commands,
  output,
  isGenerating,
}: TerminalProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);

  useEffect(() => {
    if (!isGenerating) {
      setDisplayedLines([]);
      setCurrentLine(0);
      setCurrentChar(0);
      return;
    }

    const lineInterval = setInterval(() => {
      setCurrentLine((prev) => {
        if (prev >= commands.length + output.length - 1) {
          clearInterval(lineInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(lineInterval);
  }, [isGenerating, commands.length, output.length]);

  useEffect(() => {
    if (!isGenerating) return;

    const charInterval = setInterval(() => {
      setCurrentChar((prev) => prev + 1);
    }, 50);

    return () => clearInterval(charInterval);
  }, [isGenerating]);

  useEffect(() => {
    if (currentLine < commands.length) {
      const command = commands[currentLine];
      if (currentChar <= command.length) {
        setDisplayedLines((prev) => {
          const newLines = [...prev];
          newLines[currentLine] = `$ ${command.slice(0, currentChar)}`;
          return newLines;
        });
      }
    } else {
      const outputIndex = currentLine - commands.length;
      if (outputIndex < output.length) {
        const outputLine = output[outputIndex];
        if (currentChar <= outputLine.length) {
          setDisplayedLines((prev) => {
            const newLines = [...prev];
            newLines[currentLine] = outputLine.slice(0, currentChar);
            return newLines;
          });
        }
      }
    }
  }, [currentChar, currentLine, commands, output, isGenerating]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-dark-darker rounded-lg border border-primary/20 font-mono text-sm overflow-hidden"
    >
      <div className="flex items-center px-4 py-2 bg-dark-lighter border-b border-primary/20">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="flex-1 text-center text-xs text-light-darker">
          incepto_nx_terminal
        </div>
      </div>
      <div className="p-4 space-y-2 h-[300px] overflow-y-auto">
        {displayedLines.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-mono text-light"
          >
            {line}
          </motion.div>
        ))}
        {isGenerating && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-2 h-4 bg-primary ml-1"
          />
        )}
      </div>
    </motion.div>
  );
}
