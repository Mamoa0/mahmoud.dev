 const formatMessage = (text: string) => {
    // Step 1: Remove any leading * and surrounding whitespace
    const cleanMarkdownSyntax = (input: string) =>
      input.replace(/\*{1,3}/g, "").replace(/^\s*\*\s*/gm, "").trim();
  
    // Step 2: Linkify emails, phones, URLs
    const linkify = (text: string) => {
      const regex =
        /(\bhttps?:\/\/[^\s]+)|(\+\d{11,15})|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/gi;
  
      const elements: React.ReactNode[] = [];
      let lastIndex = 0;
      let match;
      const workingRegex = new RegExp(regex, "gi");
  
      while ((match = workingRegex.exec(text)) !== null) {
        const matchIndex = match.index;
        const fullMatch = match[0];
  
        if (matchIndex > lastIndex) {
          elements.push(text.slice(lastIndex, matchIndex));
        }
  
        if (fullMatch.startsWith("http")) {
          elements.push(
            <a
              key={`link-${matchIndex}`}
              href={fullMatch}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              {fullMatch}
            </a>
          );
        } else if (fullMatch.startsWith("+")) {
          elements.push(
            <a
              key={`phone-${matchIndex}`}
              href={`tel:${fullMatch}`}
              className="text-blue-600 underline hover:text-blue-800"
            >
              {fullMatch}
            </a>
          );
        } else {
          elements.push(
            <a
              key={`email-${matchIndex}`}
              href={`mailto:${fullMatch}`}
              className="text-blue-600 underline hover:text-blue-800"
            >
              {fullMatch}
            </a>
          );
        }
  
        lastIndex = matchIndex + fullMatch.length;
      }
  
      if (lastIndex < text.length) {
        elements.push(text.slice(lastIndex));
      }
  
      return elements;
    };
  
    const boldLabels = (content: React.ReactNode[]) => {
      const regex = /\b(Phone|Email|LinkedIn|GitHub):/gi;
  
      return content.flatMap((el, index) => {
        if (typeof el !== "string") return el;
  
        const parts: React.ReactNode[] = [];
        let lastIndex = 0;
        let match;
  
        while ((match = regex.exec(el)) !== null) {
          const matchIndex = match.index;
  
          if (matchIndex > lastIndex) {
            parts.push(el.slice(lastIndex, matchIndex));
          }
  
          parts.push(
            <strong key={`label-${index}-${matchIndex}`} className="font-bold">
              {match[0]}
            </strong>
          );
  
          lastIndex = matchIndex + match[0].length;
        }
  
        if (lastIndex < el.length) {
          parts.push(el.slice(lastIndex));
        }
  
        return parts.length ? parts : el;
      });
    };
  
    // Apply steps
    const cleanedText = cleanMarkdownSyntax(text);
    const linkified = linkify(cleanedText);
    const formatted = boldLabels(linkified);
  
    return formatted;
  };

  export default formatMessage