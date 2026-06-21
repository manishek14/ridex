import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface TabContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabContext = React.createContext<TabContextType | undefined>(undefined);

const useTabContext = () => {
  const context = React.useContext(TabContext);
  if (!context) throw new Error("useTabContext must be used within Tabs");
  return context;
};

interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ defaultValue, children, className }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>{children}</div>
    </TabContext.Provider>
  );
};

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex border-b border-gray-200 dark:border-gray-800", className)}
      {...props}
    />
  )
);
TabsList.displayName = "TabsList";

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, className, ...props }, ref) => {
    const { activeTab, setActiveTab } = useTabContext();
    const isActive = activeTab === value;

    return (
      <button
        ref={ref}
        className={cn(
          "px-4 py-2 text-sm font-medium transition-colors",
          isActive
            ? "border-b-2 border-blue-600 text-blue-600"
            : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100",
          className
        )}
        onClick={() => setActiveTab(value)}
        {...props}
      />
    );
  }
);
TabsTrigger.displayName = "TabsTrigger";

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value, className, ...props }, ref) => {
    const { activeTab } = useTabContext();

    if (activeTab !== value) return null;

    return <div ref={ref} className={className} {...props} />;
  }
);
TabsContent.displayName = "TabsContent";
