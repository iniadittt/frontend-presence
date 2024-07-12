import { Home, Users, CalendarCheck, FileMinus } from "lucide-react";

export const dataSidebar = [
  {
    title: "Dashboard",
    href: "/admin",
    iconXl: () => <Home className="h-4 w-4" />,
    icon: () => <Home className="h-5 w-5" />,
    active: true,
  },
  {
    title: "Pengguna",
    href: "/admin/users",
    iconXl: () => <Users className="h-4 w-4" />,
    icon: () => <Users className="h-5 w-5" />,
    active: false,
  },
  {
    title: "Presensi",
    href: "/admin/presences",
    iconXl: () => <CalendarCheck className="h-4 w-4" />,
    icon: () => <CalendarCheck className="h-5 w-5" />,
    active: false,
  },
  {
    title: "Laporan",
    href: "/admin/reports",
    iconXl: () => <FileMinus className="h-4 w-4" />,
    icon: () => <FileMinus className="h-5 w-5" />,
    active: false,
  },
];
