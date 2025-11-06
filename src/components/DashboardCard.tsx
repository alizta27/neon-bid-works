import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface DashboardCardProps {
  title: string;
  value: string | number;
  description?: string;
}

export default function DashboardCard({
  title,
  value,
  description,
}: DashboardCardProps) {
  return (
    <Card
      className="p-4 hover-elevate"
      data-testid={`card-dashboard-${title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p
            className="text-sm text-muted-foreground mb-1"
            data-testid="text-card-title"
          >
            {title}
          </p>
          <p className="text-2xl font-bold mb-1" data-testid="text-card-value">
            {value}
          </p>
          {description && (
            <p
              className="text-xs text-muted-foreground"
              data-testid="text-card-description"
            >
              {description}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
