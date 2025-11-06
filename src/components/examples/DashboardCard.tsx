import DashboardCard from '../DashboardCard';
import { Coins, Briefcase, CheckCircle, TrendingUp } from 'lucide-react';

export default function DashboardCardExample() {
  return (
    <div className="max-w-md mx-auto p-4 grid grid-cols-2 gap-3">
      <DashboardCard
        icon={Coins}
        title="Token Saya"
        value="12,500"
        iconColor="text-chart-4"
      />
      <DashboardCard
        icon={Briefcase}
        title="Pekerjaan Aktif"
        value="8"
        description="+2 minggu ini"
        iconColor="text-primary"
      />
      <DashboardCard
        icon={CheckCircle}
        title="Selesai"
        value="42"
        iconColor="text-chart-2"
      />
      <DashboardCard
        icon={TrendingUp}
        title="Rating"
        value="4.9"
        description="dari 35 ulasan"
        iconColor="text-chart-4"
      />
    </div>
  );
}
