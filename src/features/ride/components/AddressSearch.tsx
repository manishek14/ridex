"use client";

import { useState, useEffect } from "react";
import { Search, MapPin, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useDebounce } from "@/shared/hooks/useDebounce";

interface Suggestion {
  title: string;
  address: string;
  location: { x: number; y: number };
}

export function AddressSearch({ 
  placeholder, 
  onSelect, 
  locale = "fa" 
}: { 
  placeholder: string; 
  onSelect: (s: Suggestion) => void;
  locale?: string;
}) {
  const isFa = locale === "fa";
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery.length < 3) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setIsLoading(true);
      try {
        // Simulated Neshan Search API call
        // In real app: fetch(`https://api.neshan.org/v1/search?term=${debouncedQuery}&lat=35.699&lng=51.337`, { headers: { 'Api-Key': 'YOUR_KEY' } })
        await new Promise(r => setTimeout(r, 600));
        const mockResults: Suggestion[] = [
          { title: isFa ? "میدان آزادی" : "Azadi Square", address: isFa ? "تهران، میدان آزادی" : "Azadi Sq, Tehran", location: { x: 51.337, y: 35.699 } },
          { title: isFa ? "برج میلاد" : "Milad Tower", address: isFa ? "تهران، بزرگراه همت" : "Hemmat Hwy, Tehran", location: { x: 51.375, y: 35.744 } },
          { title: isFa ? "فرودگاه مهرآباد" : "Mehrabad Airport", address: isFa ? "تهران، میدان آزادی" : "Azadi Sq, Tehran", location: { x: 51.314, y: 35.689 } },
        ].filter(s => s.title.toLowerCase().includes(debouncedQuery.toLowerCase()) || s.title.includes(debouncedQuery));
        
        setSuggestions(mockResults);
      } catch (error) {
        console.error("Search failed", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery, isFa]);

  return (
    <div className="relative w-full" dir={isFa ? "rtl" : "ltr"}>
      <div className="relative group">
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-fg4 group-focus-within:text-fg transition-colors">
          {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pr-12 pl-12 py-4 rounded-2xl bg-bg2 border border-bdr text-sm font-bold outline-none focus:border-fg focus:ring-4 focus:ring-fg/5 transition-all"
        />
        {query && (
          <button 
            onClick={() => setQuery("")}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-fg4 hover:text-fg"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute z-[100] top-full left-0 right-0 mt-2 p-2 rounded-2xl bg-bg2 border border-bdr shadow-2xl backdrop-blur-xl"
          >
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => {
                  onSelect(s);
                  setQuery(s.title);
                  setSuggestions([]);
                }}
                className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-glass transition-all text-right"
              >
                <div className="w-10 h-10 rounded-lg bg-glass border border-bdr flex items-center justify-center text-fg3">
                  <MapPin size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-fg truncate">{s.title}</p>
                  <p className="text-[10px] text-fg4 font-bold truncate">{s.address}</p>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
