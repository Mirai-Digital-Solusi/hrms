import { Icons } from '@/components/icons';
import { KehadiranNavItem, NavItem, SidebarNavItem } from '@/types';

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};

export type Pegawai = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};

export type Kehadiran = {
  id: number;
  name: string;
  division: string;
  role: string;
  status: string;
  check_in: string;
  check_out: string;
};

export type Overtime = {
  id: number;
  name: string;
  division: string;
  role: string;
  date: string;
  hour: string;
  status: string;
  description: string;
};

export type Leave = {
  id: number;
  name: string;
  division: string;
  role: string;
  type: string;
  date_from: string;
  date_to: string;
  status: string;
  description: string;
};

export const users: User[] = [
  {
    id: 1,
    name: 'Candice Schiner',
    company: 'Dell',
    role: 'Frontend Developer',
    verified: false,
    status: 'Active'
  },
  {
    id: 2,
    name: 'John Doe',
    company: 'TechCorp',
    role: 'Backend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 3,
    name: 'Alice Johnson',
    company: 'WebTech',
    role: 'UI Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 4,
    name: 'David Smith',
    company: 'Innovate Inc.',
    role: 'Fullstack Developer',
    verified: false,
    status: 'Inactive'
  },
  {
    id: 5,
    name: 'Emma Wilson',
    company: 'TechGuru',
    role: 'Product Manager',
    verified: true,
    status: 'Active'
  },
  {
    id: 6,
    name: 'James Brown',
    company: 'CodeGenius',
    role: 'QA Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 7,
    name: 'Laura White',
    company: 'SoftWorks',
    role: 'UX Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 8,
    name: 'Michael Lee',
    company: 'DevCraft',
    role: 'DevOps Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 9,
    name: 'Olivia Green',
    company: 'WebSolutions',
    role: 'Frontend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 10,
    name: 'Robert Taylor',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active'
  }
];

export const pegawais: Pegawai[] = [
  {
    id: 1,
    name: 'Candice Schiner',
    company: 'Dell',
    role: 'Frontend Developer',
    verified: false,
    status: 'Active'
  },
  {
    id: 2,
    name: 'John Doe',
    company: 'TechCorp',
    role: 'Backend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 3,
    name: 'Alice Johnson',
    company: 'WebTech',
    role: 'UI Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 4,
    name: 'David Smith',
    company: 'Innovate Inc.',
    role: 'Fullstack Developer',
    verified: false,
    status: 'Inactive'
  },
  {
    id: 5,
    name: 'Emma Wilson',
    company: 'TechGuru',
    role: 'Product Manager',
    verified: true,
    status: 'Active'
  },
  {
    id: 6,
    name: 'James Brown',
    company: 'CodeGenius',
    role: 'QA Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 7,
    name: 'Laura White',
    company: 'SoftWorks',
    role: 'UX Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 8,
    name: 'Michael Lee',
    company: 'DevCraft',
    role: 'DevOps Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 9,
    name: 'Olivia Green',
    company: 'WebSolutions',
    role: 'Frontend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 10,
    name: 'Robert Taylor',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active'
  }
];

// export const kehadirans: Kehadiran[] = [
//   {
//     id: 1,
//     name: 'Candice Schiner',
//     divisi: 'IT',
//     role: 'Frontend Developer',
//     verified: false,
//     status: 'Masuk Tepat Waktu',
//     checkIn: '08:15',
//     checkOut: '17:49'
//   },
//   {
//     id: 2,
//     name: 'John Doe',
//     divisi: 'IT',
//     role: 'Backend Developer',
//     verified: false,
//     status: 'Masuk Tepat Waktu',
//     checkIn: '08:22',
//     checkOut: '18:49'
//   },
//   {
//     id: 3,
//     name: 'Alice Johnson',
//     divisi: 'IT',
//     role: 'UI Designer',
//     verified: false,
//     status: 'Terlambat',
//     checkIn: '08:40',
//     checkOut: '17:33'
//   },
//   {
//     id: 4,
//     name: '	David Smith',
//     divisi: 'IT',
//     role: 'Fullstack Developer',
//     verified: false,
//     status: 'Tidak Check In',
//     checkIn: '',
//     checkOut: '17:30'
//   },
//   {
//     id: 5,
//     name: 'Emma Wilson',
//     divisi: 'IT',
//     role: 'Product Manager',
//     verified: false,
//     status: 'Tidak Check Out',
//     checkIn: '08:22',
//     checkOut: ''
//   }
// ];

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export const kehadiranNavItems: KehadiranNavItem[] = [
  {
    title: 'Attendance',
    subNav: [
      {
        href: '/dashboard/kehadiran',
        label: 'Attendance List',
        description: 'List all data attendance'
      },
      {
        href: '/dashboard/kehadiran/approval',
        label: 'Approval',
        description: 'List all attendance request'
      }
    ]
  },
  {
    title: 'Overtime',
    subNav: [
      {
        href: '/dashboard/kehadiran/overtime',
        label: 'Overtime List',
        description: 'List all data attendance'
      },
      {
        href: '/dashboard/kehadiran/overtime/approval',
        label: 'Approval',
        description: 'List all overtime request'
      }
    ]
  },
  {
    title: 'Time-off',
    subNav: [
      {
        href: '/dashboard/kehadiran/leave',
        label: 'Time-off List',
        description: 'List all data attendance'
      },
      {
        href: '/dashboard/kehadiran/leave/approval',
        label: 'Approval',
        description: 'List all time-off request'
      }
    ]
  }
];

export const navItems: NavItem[] = [
  {
    title: 'Admin',
    label: 'Admin'
  },
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'dashboard',
    label: 'Dashboard'
  },
  {
    title: 'Employee',
    href: '/dashboard/employee',
    icon: 'users',
    label: 'employee'
  },
  // {
  //   title: 'Pegawai',
  //   href: '/dashboard/pegawai',
  //   icon: 'users',
  //   label: 'Pegawai'
  // },
  {
    title: 'Kehadiran',
    href: '/dashboard/kehadiran',
    icon: 'userCheck',
    label: 'Kehadiran'
  },
  {
    title: 'Personal',
    label: 'Personal'
  },
  {
    title: 'Team Board',
    href: '/dashboard/kanban',
    icon: 'kanban',
    label: 'Team Board'
  },
  // {
  //   title: 'User',
  //   href: '/dashboard/user',
  //   icon: 'user',
  //   label: 'user'
  // },
  // {
  //   title: 'Profile',
  //   href: '/dashboard/profile',
  //   icon: 'profile',
  //   label: 'profile'
  // },
  // {
  //   title: 'Kanban',
  //   href: '/dashboard/kanban',
  //   icon: 'kanban',
  //   label: 'kanban'
  // },
  {
    title: 'Login',
    href: '/',
    icon: 'login',
    label: 'login'
  }
];
