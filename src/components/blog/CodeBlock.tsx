import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  language: string;
  children: string;
}

export const CodeBlock = ({ language, children }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <button
        onClick={handleCopy}
        className="absolute right-3 top-3 p-2 rounded-md bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-all opacity-0 group-hover:opacity-100 z-10"
        title="Copy code"
      >
        {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
      </button>
      <SyntaxHighlighter
        style={oneDark}
        language={language}
        PreTag="div"
        className="rounded-lg bg-[#1a1b26] !my-6"
        customStyle={{
          padding: "1.5rem",
          fontSize: "0.9rem",
          borderRadius: "0.75rem",
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
};
