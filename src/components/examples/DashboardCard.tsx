import DashboardCard from '../DashboardCard';
import { Coins, Briefcase, CheckCircle, TrendingUp } from 'lucide-react';

export default function DashboardCardExample() {
  return (
    <div className="max-w-md mx-auto p-4 grid grid-cols-2 gap-3">
      <DashboardCard
        title="Token Saya"
        value="12,500"
      />
      <DashboardCard
        title="Pekerjaan Aktif"
        value="8"
        description="+2 minggu ini"
      />
      <DashboardCard
        title="Selesai"
        value="42"
      />
      <DashboardCard
        title="Rating"
        value="4.9"
        description="dari 35 ulasan"
      />
    </div>
  );
}
