type PlaceholderCardProps = {
  label: string;
  items: string[];
};

export function PlaceholderCard({ label, items }: PlaceholderCardProps) {
  return (
    <div className="fx-glass fx-glass--card rounded-2xl border border-dashed border-border/60 p-8">
      <p className="font-mono text-sm text-foreground/90">// {label}</p>
      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-primary/70" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
