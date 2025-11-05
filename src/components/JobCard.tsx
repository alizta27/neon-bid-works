import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, Clock, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

interface JobCardProps {
  id: string;
  title: string;
  description: string;
  budgetMin: number;
  budgetMax: number;
  category: string;
  skills: string[];
  createdAt: string;
}

const JobCard = ({ id, title, description, budgetMin, budgetMax, category, skills, createdAt }: JobCardProps) => {
  return (
    <Card className="group hover:shadow-hover transition-all duration-300 shadow-card border-2 hover:border-primary/30">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
              {title}
            </CardTitle>
            <CardDescription className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4" />
              Posted {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="gradient-accent text-accent-foreground">
            {category}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-muted-foreground line-clamp-3 mb-4">{description}</p>
        
        <div className="flex items-center gap-2 mb-4">
          <DollarSign className="h-5 w-5 text-primary" />
          <span className="font-bold text-lg">
            ${budgetMin} - ${budgetMax}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {skills.slice(0, 4).map((skill, index) => (
            <Badge key={index} variant="outline" className="gap-1">
              <Tag className="h-3 w-3" />
              {skill}
            </Badge>
          ))}
          {skills.length > 4 && (
            <Badge variant="outline">+{skills.length - 4} more</Badge>
          )}
        </div>
      </CardContent>

      <CardFooter>
        <Button asChild className="w-full gradient-primary shadow-glow">
          <Link to={`/jobs/${id}`}>View Details & Apply</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
