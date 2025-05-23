import { Clock } from 'lucide-react';
import type { SteamStats } from '@/lib/steam/types';

export interface ProfileSectionProps {
  profile: SteamStats['profile'];
  totalPlaytime: number;
  formatPlaytime: (minutes: number) => string;
  t: {
    totalPlaytime: string;
    online: string;
    offline: string;
  };
}

export function ProfileSection({ profile, totalPlaytime, formatPlaytime, t }: ProfileSectionProps) {
  return (
    <div className="flex items-center gap-4">
      <img src={profile.avatar} alt={profile.personaname} className="h-12 w-12 rounded-full" />
      <div>
        <h3 className="text-primary-foreground font-semibold">{profile.personaname}</h3>
        <p
          className="text-sm"
          style={{
            color: profile.personastate === 1 ? 'var(--steam-online)' : 'var(--steam-offline)',
          }}
        >
          {profile.personastate === 1 ? t.online : t.offline}
        </p>
      </div>
      <div className="ml-auto text-right">
        <div className="text-muted-foreground flex items-center gap-1">
          <Clock className="text-muted-foreground h-4 w-4" />
          <span className="text-sm">{t.totalPlaytime}</span>
        </div>
        <p className="text-primary-foreground font-semibold">{formatPlaytime(totalPlaytime)}</p>
      </div>
    </div>
  );
}
