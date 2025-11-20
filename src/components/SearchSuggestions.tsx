import { useEffect, useState } from "react";
import { productAPI } from "@/services/api";

interface SearchSuggestionsProps {
  query: string;
  onSelect: (suggestion: string) => void;
}

export const SearchSuggestions = ({ query, onSelect }: SearchSuggestionsProps) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      try {
        const results = await productAPI.getSuggestions(query, 5);
        setSuggestions(results);
      } catch (error) {
        console.error("Failed to fetch suggestions:", error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  if (suggestions.length === 0 && !loading) {
    return null;
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg overflow-hidden z-50">
      {loading ? (
        <div className="p-4 text-sm text-muted-foreground">Loading...</div>
      ) : (
        <ul className="py-2">
          {suggestions.map((suggestion, index) => (
            <li key={index}>
              <button
                className="w-full text-left px-4 py-2 hover:bg-secondary transition-colors text-sm"
                onClick={() => onSelect(suggestion)}
              >
                {suggestion}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
