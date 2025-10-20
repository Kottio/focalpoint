export interface ProfileCompletionField {
  key: string;
  label: string;
  completed: boolean;
  description: string;
}

export interface ProfileCompletion {
  percentage: number;
  completed: number;
  total: number;
  fields: ProfileCompletionField[];
  isComplete: boolean;
}

export function getProfileCompletion(user: any): ProfileCompletion {
  const fields: ProfileCompletionField[] = [
    {
      key: 'email',
      label: 'Email',
      completed: !!user.email,
      description: 'Your email address'
    },
    {
      key: 'username',
      label: 'Username',
      completed: !!user.username,
      description: 'Choose a unique username'
    },
    {
      key: 'fullName',
      label: 'Full Name',
      completed: !!user.fullName,
      description: 'Your display name'
    },
    {
      key: 'bio',
      label: 'Bio',
      completed: !!user.bio,
      description: 'Tell us about yourself'
    },
    {
      key: 'avatarUrl',
      label: 'Profile Picture',
      completed: !!user.avatarUrl,
      description: 'Add a profile photo'
    },
  ];

  const completed = fields.filter(f => f.completed).length;
  const total = fields.length;
  const percentage = Math.round((completed / total) * 100);

  return {
    percentage,
    completed,
    total,
    fields,
    isComplete: percentage === 100
  };
}

export function needsOnboarding(user: any): boolean {
  // L'utilisateur a besoin d'onboarding s'il n'a que son email
  return !!user.email && !user.username && !user.fullName;
}
