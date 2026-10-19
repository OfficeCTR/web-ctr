const Highlight = ({ text, className }: { text: string; className: string }) => (
  <>
    {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={i} className={`font-bold ${className}`}>
          {part.slice(2, -2)}
        </strong>
      ) : (
        part
      ),
    )}
  </>
);

export default Highlight;
