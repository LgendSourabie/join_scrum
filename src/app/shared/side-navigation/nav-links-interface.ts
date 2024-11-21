export interface Links {
  path: string;
  url: string;
  text: string;
  icon: string;
}

export const linkData: Links[] = [
  {
    text: 'summary',
    url: 'summary',
    path: '/dashboard/summary',
    icon: 'summary',
  },
  {
    text: 'add task',
    url: 'task',
    path: '/dashboard/task',
    icon: 'addTask',
  },
  {
    text: 'board',
    url: 'board',
    path: '/dashboard/board',
    icon: 'board',
  },
  {
    text: 'contacts',
    url: 'contacts',
    path: '/dashboard/contacts',
    icon: 'contact',
  },
];
