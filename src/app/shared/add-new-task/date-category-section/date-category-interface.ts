export interface Priority {
  description: string;
  icon: string;
}

export let priorityData: Priority[] = [
  { description: 'urgent', icon: 'priourgent' },
  { description: 'medium', icon: 'priomedium' },
  { description: 'low', icon: 'priolow' },
];
