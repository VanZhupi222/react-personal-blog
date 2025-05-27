import React from 'react';
import { useTranslations } from '@/lib/hooks/useTranslations';
import Image from 'next/image';

interface AchievementCardProps {
  achievement: {
    icon: string;
    icongray: string;
    displayName: string;
    description: string;
    achieved: number;
    unlocktime: number;
    rarity?: number;
  };
  isFloating?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
}

function formatUnlockTime(unlocktime: number) {
  if (!unlocktime) return '';
  const date = new Date(unlocktime * 1000);
  return date.toLocaleDateString();
}

export const AchievementCard: React.FC<AchievementCardProps> = ({
  achievement: ach,
  isFloating = false,
  onMouseEnter,
  onMouseLeave,
  className = '',
}) => {
  const { t } = useTranslations();
  if (isFloating) {
    return (
      <div
        className={`border-primary bg-popover absolute top-0 left-0 z-30 flex w-full items-center rounded-lg border p-4 shadow-2xl ${className}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12">
            <Image
              src={ach.achieved ? ach.icon : ach.icongray}
              alt={ach.displayName}
              fill
              sizes="48px"
              className={`bg-white object-cover object-center shadow ${typeof ach.rarity === 'number' && ach.rarity < 10 ? 'border-achievement-rare-glow border-3' : ''}`}
              priority={false}
            />
          </div>
          <div className="min-w-0 flex-1">
            <div
              className={`text-lg font-semibold ${ach.achieved ? 'text-achievement-darkgreen' : 'text-achievement-gray'}`}
            >
              {ach.displayName}
            </div>
            <div className="text-achievement-gray mt-1 text-xs break-words whitespace-normal">
              {ach.description}
            </div>
            {ach.achieved ? (
              <div className="text-achievement-green mt-1 text-xs">
                {t.achievements.achieved} {formatUnlockTime(ach.unlocktime)}
              </div>
            ) : null}
            {typeof ach.rarity === 'number' && (
              <div
                className={`text-xs font-bold ${ach.rarity < 10 ? 'text-achievement-rare-glow-strong' : 'text-achievement-gray'}`}
                style={
                  ach.rarity < 10
                    ? {
                        textShadow:
                          '0 0 4px var(--color-achievement-rare-text-shadow), 0 0 8px var(--color-achievement-rare-glow)',
                      }
                    : undefined
                }
              >
                {t.achievements.ownedByPercent.replace('{percent}', ach.rarity.toFixed(1))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      className={`group bg-steam-achievement hover:bg-steam-achievement/80 relative flex min-h-[5.5rem] items-center gap-3 rounded-lg p-2 shadow-sm transition-all duration-300 ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ zIndex: 1 }}
    >
      <div className="flex items-center gap-3">
        <div className="relative h-10 w-10">
          <Image
            src={ach.achieved ? ach.icon : ach.icongray}
            alt={ach.displayName}
            fill
            sizes="40px"
            className={`bg-white object-cover object-center shadow ${typeof ach.rarity === 'number' && ach.rarity < 10 ? 'border-achievement-rare-glow border-3' : ''}`}
            priority={false}
          />
        </div>
        <div className="min-w-0 flex-1">
          <div
            className={`line-clamp-1 max-w-full font-semibold ${ach.achieved ? 'text-achievement-darkgreen' : 'text-achievement-gray'}`}
          >
            {ach.displayName}
          </div>
          <div className="flex flex-col">
            <div
              className={`${ach.achieved ? 'line-clamp-1' : 'line-clamp-2'} text-achievement-gray text-xs`}
            >
              {ach.description}
            </div>
            {ach.achieved ? (
              <div className="text-achievement-green text-xs">
                {t.achievements.achieved} {formatUnlockTime(ach.unlocktime)}
              </div>
            ) : null}
            {typeof ach.rarity === 'number' && (
              <div
                className={`text-xs font-bold ${ach.rarity < 10 ? 'text-achievement-rare-glow-strong' : 'text-achievement-gray'}`}
                style={
                  ach.rarity < 10
                    ? {
                        textShadow:
                          '0 0 4px var(--color-achievement-rare-text-shadow), 0 0 8px var(--color-achievement-rare-glow)',
                      }
                    : undefined
                }
              >
                {t.achievements.ownedByPercent.replace('{percent}', ach.rarity.toFixed(1))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
