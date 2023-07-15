import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Base',
      separator: true,
      items: [
        {
          icon: 'assets/icons/outline/chart-pie.svg',
          label: 'Menu',
          route: '/dashboard',
          children: [
            { label: 'Dashboard', route: '/dashboard/main' ,roles: ['ROLE_USER', 'ROLE_ADMIN']},
            { label: 'Deposit', route: '/dashboard/deposit' ,roles: ['ROLE_USER']},
            { label: 'Withdraw', route: '/dashboard/withdraw',roles: ['ROLE_USER'] },
            { label: 'Transfer', route: '/dashboard/transfer' ,roles: ['ROLE_USER']},
            { label: 'Approve', route: '/dashboard/approve',roles: ['ROLE_ADMIN'] },
          ],
        },
      ],
    },

  ];
}
