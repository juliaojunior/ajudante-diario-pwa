import { CategoryHeader } from "@/components/molecules/CategoryHeader";
import { CheckboxItem } from "@/components/molecules/CheckboxItem";
import { IconButton } from "@/components/molecules/IconButton";
import type { ShoppingItem } from "@/lib/types";

export interface ShoppingCategoryProps {
  categoryLabel: string;
  categoryColor?: string;
  items: ShoppingItem[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  className?: string;
}

/**
 * Organismo: ShoppingCategory
 * Seção de categoria na lista de compras
 */
export function ShoppingCategory({
  categoryLabel,
  categoryColor,
  items,
  onToggle,
  onDelete,
  className,
}: ShoppingCategoryProps) {
  if (items.length === 0) return null;

  return (
    <section className={className} aria-labelledby={`cat-${categoryLabel}`}>
      <CategoryHeader label={categoryLabel} color={categoryColor} />
      
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            <CheckboxItem
              label={item.label}
              emoji={item.emoji}
              checked={item.checked}
              onCheckedChange={() => onToggle(item.id)}
              className="flex-1"
            />
            
            <IconButton
              icon="delete"
              size="md"
              variant="destructive"
              onClick={() => {
                if (window.confirm(`Apagar "${item.label}"?`)) {
                  onDelete(item.id);
                }
              }}
              aria-label={`Apagar ${item.label}`}
              className="bg-red-900/30 hover:bg-red-900/50 border border-red-800"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
